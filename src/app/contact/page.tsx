import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { images } from "@/lib/images";

export const metadata = {
  title: "Contact Us — ShopEase",
  description: "Get in touch with ShopEase customer support.",
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="about-hero">
        <Image
          src={images.hero}
          alt="Contact ShopEase"
          fill
          priority
          sizes="100vw"
          className="about-hero__bg"
        />
        <div className="about-hero__overlay" />
        <div className="container about-hero__content">
          <span className="about-hero__badge">Contact Us</span>
          <h1>We&apos;re Here to Help</h1>
          <p>Reach out anytime — our team is ready to assist with orders, products, and more.</p>
        </div>
      </section>

      <section className="container contact-section">
        <ContactForm />
      </section>

      <footer className="footer">
        <div className="container footer__inner">
          <p className="logo">ShopEase</p>
          <p>
            <Link href="/about">About Us</Link>
            {" · "}
            <Link href="/contact">Contact Us</Link>
            {" · "}
            &copy; 2026 ShopEase. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
