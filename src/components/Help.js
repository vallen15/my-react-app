// src/components/Help.js
import React, { useState } from 'react';
import '../css/Help.css';

function Help() {
  const [faqs, setFaqs] = useState([
    {
      question: "Bagaimana cara memesan tiket?",
      answer: "Anda dapat memesan tiket melalui halaman 'Pesan Tiket' setelah melakukan login.",
      isOpen: false,
    },
    {
      question: "Bagaimana cara membatalkan tiket?",
      answer: "Untuk membatalkan tiket, silakan hubungi admin melalui formulir di bawah ini.",
      isOpen: false,
    },
    {
      question: "Apakah ada batas penggunaan tiket?",
      answer: "Tiket berlaku selama 3 hari setelah pemesanan.",
      isOpen: false,
    },
  ]);

  const toggleFAQ = (index) => {
    setFaqs(faqs.map((faq, i) => (i === index ? { ...faq, isOpen: !faq.isOpen } : faq)));
  };

  return (
    <div className="help-container">
      <h1>Help / Bantuan</h1>
      <p>Temukan jawaban atas pertanyaan umum atau hubungi kami jika perlu bantuan lebih lanjut.</p>

      <div className="faq-section">
        <h2>Frequently Asked Questions (FAQ)</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item" onClick={() => toggleFAQ(index)}>
            <h3 className={`faq-question ${faq.isOpen ? 'open' : ''}`}>{faq.question}</h3>
            {faq.isOpen && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </div>

      <div className="contact-form">
        <h2>Butuh Bantuan Lainnya?</h2>
        <form>
          <label>
            Nama:
            <input type="text" required />
          </label>
          <label>
            Email:
            <input type="email" required />
          </label>
          <label>
            Pesan:
            <textarea rows="5" required></textarea>
          </label>
          <button type="submit">Kirim Pesan</button>
        </form>
      </div>
    </div>
  );
}

export default Help;
