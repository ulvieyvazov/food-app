## Email Doğrulama Sunucusu

Geliştirme için basit bir e‑posta gönderim sunucusu eklendi. Aşağıdaki sağlayıcılardan birini .env ile seçin:

```
EMAIL_PROVIDER=smtp # veya sendgrid / resend
FROM_EMAIL="Lezzet Duragi <no-reply@example.com>"

# SMTP için
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass

# SendGrid için
SENDGRID_API_KEY=SG.xxxxxx

# Resend için
RESEND_API_KEY=re_xxxxxx
```

Çalıştırma:

```
npm run server   # 4000 portunda API
npm run dev      # 5173 portunda Vite; /api istekleri 4000'e proxylenir
```

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
