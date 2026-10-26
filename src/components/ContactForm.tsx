import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setStatus('loading');
    
    // GANTI DENGAN SERVICE ID, TEMPLATE ID, DAN PUBLIC KEY EMAILJS KAMU
    // (Bisa dilihat di dashboard EmailJS kamu)
    emailjs.sendForm('service_jikxbjd', 'template_beqfhmy', form.current, 'Nz7EQLCcWn0ujcsin')
      .then(() => {
        setStatus('success');
        setMessage('Pesan berhasil terkirim! Terima kasih sudah menghubungi.');
        form.current?.reset();
      }, (error) => {
        setStatus('error');
        setMessage('Gagal mengirim pesan. Silakan coba lagi nanti.');
        console.error(error);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4 w-full">
      
      {/* Notifikasi */}
      {status === 'success' && (
        <div className="p-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-900/30 dark:text-green-400">
          {message}
        </div>
      )}
      {status === 'error' && (
        <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-400">
          {message}
        </div>
      )}

      <div>
        <label htmlFor="user_name" className="block text-sm font-semibold mb-1">Nama Lengkap</label>
        <input 
          type="text" 
          name="user_name" 
          id="user_name" 
          required 
          className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 dark:border-neutral-700 bg-transparent focus:outline-none focus:border-[#291334] dark:focus:border-white transition-colors"
          placeholder="Masukkan nama"
        />
      </div>

      <div>
        <label htmlFor="user_email" className="block text-sm font-semibold mb-1">Alamat Email</label>
        <input 
          type="email" 
          name="user_email" 
          id="user_email" 
          required 
          className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 dark:border-neutral-700 bg-transparent focus:outline-none focus:border-[#291334] dark:focus:border-white transition-colors"
          placeholder="email@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold mb-1">Pesan</label>
        <textarea 
          name="message" 
          id="message" 
          required 
          rows={5}
          className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 dark:border-neutral-700 bg-transparent focus:outline-none focus:border-[#291334] dark:focus:border-white transition-colors resize-none"
          placeholder="Tulis pesan atau ide projek di sini..."
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={status === 'loading'}
        className="mt-2 w-full sm:w-auto px-8 py-3 bg-[#291334] text-white dark:bg-white dark:text-[#291334] font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Mengirim...' : 'Kirim Pesan'}
      </button>
    </form>
  );
}