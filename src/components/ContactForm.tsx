"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
    window.setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="contact-layout">
      <div className="contact-info">
        <h2>Get in Touch</h2>
        <p>Have a question about an order, product, or return? We&apos;d love to hear from you.</p>
        <ul className="contact-info__list">
          <li>
            <strong>Email</strong>
            <span>support@shopease.com</span>
          </li>
          <li>
            <strong>Phone</strong>
            <span>+1 (800) 555-0199</span>
          </li>
          <li>
            <strong>Hours</strong>
            <span>Mon – Fri, 9am – 6pm</span>
          </li>
          <li>
            <strong>Address</strong>
            <span>123 Fashion Ave, New York, NY</span>
          </li>
        </ul>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        {sent && (
          <p className="contact-form__success" role="status">
            ✓ Message sent! We&apos;ll get back to you soon.
          </p>
        )}

        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
          />
        </label>

        <label>
          Message
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help?"
            rows={5}
            required
          />
        </label>

        <button type="submit" className="btn btn--primary">
          Send Message
        </button>
      </form>
    </div>
  );
}
