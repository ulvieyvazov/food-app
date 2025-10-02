import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const EMAIL_PROVIDER = (process.env.EMAIL_PROVIDER || 'smtp').toLowerCase();
const FROM_EMAIL = process.env.FROM_EMAIL;

async function sendWithSMTP(to, subject, text) {
  const nodemailer = await import('nodemailer');
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || 'false') === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  await transporter.sendMail({ from: FROM_EMAIL, to, subject, text });
}

async function sendWithSendGrid(to, subject, text) {
  const sg = await import('@sendgrid/mail');
  sg.default.setApiKey(process.env.SENDGRID_API_KEY);
  await sg.default.send({ to, from: FROM_EMAIL, subject, text });
}

async function sendWithResend(to, subject, text) {
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({ from: FROM_EMAIL, to, subject, text });
}

app.post('/api/send-code', async (req, res) => {
  try {
    const { to, code } = req.body || {};
    if (!to || !code) {
      return res.status(400).json({ error: 'to ve code gereklidir' });
    }
    if (!FROM_EMAIL) {
      return res.status(500).json({ error: 'FROM_EMAIL tanımlı değil' });
    }
    const subject = 'Lezzet Durağı - Doğrulama Kodunuz';
    const text = `Doğrulama kodunuz: ${code}\nBu kod 10 dakika boyunca geçerlidir.`;

    switch (EMAIL_PROVIDER) {
      case 'sendgrid':
        await sendWithSendGrid(to, subject, text);
        break;
      case 'resend':
        await sendWithResend(to, subject, text);
        break;
      case 'smtp':
      default:
        await sendWithSMTP(to, subject, text);
    }
    res.json({ ok: true });
  } catch (err) {
    console.error('send-code error', err);
    res.status(500).json({ error: 'E-posta gönderilemedi' });
  }
});

app.listen(PORT, () => {
  console.log(`Email server listening on http://localhost:${PORT}`);
});


