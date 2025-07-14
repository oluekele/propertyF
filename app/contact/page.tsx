'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateConfig = () => {
    if (!serviceId || !templateId || !publicKey) {
      toast.error('Email service is not properly configured.');
      console.error('Missing or invalid EmailJS config values.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current || isSubmitting) return;

    const formData = new FormData(formRef.current);
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const message = formData.get('message')?.toString().trim();

    if (!name || !email || !message) {
      toast.error('All fields are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (!validateConfig()) return;

    try {
      setIsSubmitting(true);
      await emailjs.sendForm(
        serviceId as string,
        templateId as string,
        formRef.current,
        publicKey
      );
      formRef.current.reset();
      toast.success('Message sent successfully!');
    } catch (error) {
      console.error('EmailJS error:', error);
      toast.error('Failed to send message. Try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-6 py-16 lg:max-w-3xl w-full min-h-screen flex flex-col items-center justify-center mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="grid gap-4 w-full"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="border px-4 py-2 rounded w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="border px-4 py-2 rounded w-full"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          className="border px-4 py-2 rounded w-full h-32"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      <div className="mt-10 text-center">
        <h2 className="font-semibold text-lg mb-2">Or reach out via:</h2>
        <div className="flex justify-center gap-6 text-3xl text-gray-950">
          <Link href="#" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp />
          </Link>
          <Link href="#" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </Link>
          <Link href="#" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </Link>
        </div>
      </div>
    </section>
  );
}
