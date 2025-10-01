import React from 'react';

function About() {
  return (
    <div className="about-page">
      <h1>📖 Hakkımızda</h1>
      
      <p>
        <strong>Lezzet Durağı</strong>, yemek yapmayı seven herkes için 
        hazırlanmış, pratik ve lezzetli tariflerin bir araya geldiği 
        bir platformdur.
      </p>

      <p>
        Amacımız, mutfakta geçirdiğiniz zamanı daha keyifli hale getirmek 
        ve size ilham vermek. Geleneksel Türk mutfağından modern dünya 
        lezzetlerine kadar geniş bir tarif yelpazesi sunuyoruz.
      </p>

      <p>
        Her tarif, adım adım açıklamalarla hazırlanmış olup, hem yeni 
        başlayanlar hem de deneyimli aşçılar için uygundur. 
      </p>

      <h2 style={{ color: '#667eea', marginTop: '2rem' }}>
        🎯 Vizyonumuz
      </h2>
      <p>
        Türkiye'nin en kapsamlı ve kullanıcı dostu yemek tarifi platformu 
        olmak, herkesin mutfakta başarılı olmasını sağlamak.
      </p>

      <h2 style={{ color: '#667eea', marginTop: '2rem' }}>
        ✨ Neden Biz?
      </h2>
      <ul style={{ 
        listStyle: 'none', 
        padding: '0',
        lineHeight: '2'
      }}>
        <li>✅ Kolay ve anlaşılır tarifler</li>
        <li>✅ Kategori bazlı düzenli içerik</li>
        <li>✅ Görsel destekli anlatım</li>
        <li>✅ Kullanıcı yorumları ve deneyimleri</li>
        <li>✅ Sürekli güncellenen tarif arşivi</li>
      </ul>

      <p style={{ 
        marginTop: '2rem', 
        textAlign: 'center',
        fontSize: '1.2rem',
        color: '#667eea'
      }}>
        <strong>Afiyet olsun! 🍽️❤️</strong>
      </p>
    </div>
  );
}

export default About;
