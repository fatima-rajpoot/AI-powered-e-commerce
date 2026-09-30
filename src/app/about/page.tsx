import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";

export const metadata = {
  title: "About Us — ShopEase",
  description: "Learn about ShopEase — your destination for women's and men's fashion.",
};

const stats = [
  { value: "24+", label: "Premium Products" },
  { value: "6", label: "Categories" },
  { value: "10K+", label: "Happy Customers" },
  { value: "24/7", label: "AI Support" },
];

const values = [
  {
    icon: "✨",
    title: "Our Story",
    text: "ShopEase began with one goal — make fashion shopping simple, beautiful, and trustworthy. Every item in our store is hand-selected for quality and style.",
    accent: "rose",
  },
  {
    icon: "🎯",
    title: "Our Mission",
    text: "We help you find your perfect look. From party heels and glam makeup to classic watches and leather wallets — shopping should feel effortless.",
    accent: "gold",
  },
  {
    icon: "🤖",
    title: "AI Assistant",
    text: "Our smart shopping assistant gives instant product recommendations. Just describe what you need — no waiting, no sign-up.",
    accent: "plum",
  },
];

const perks = [
  { icon: "🚚", title: "Free Shipping", desc: "On orders over $50" },
  { icon: "↩️", title: "Easy Returns", desc: "30-day hassle-free policy" },
  { icon: "🔒", title: "Secure Pay", desc: "100% protected checkout" },
  { icon: "💬", title: "AI Help 24/7", desc: "Instant product finder" },
  { icon: "⭐", title: "Top Rated", desc: "Loved by our customers" },
  { icon: "🎁", title: "Gift Ready", desc: "Beautiful packaging" },
];

const categories = [
  { name: "Heels", image: images.heels, href: "/#heels" },
  { name: "Makeup", image: images.makeup, href: "/#makeup" },
  { name: "Dress", image: images.dress, href: "/#dress" },
  { name: "Watches", image: images.watches, href: "/#watches" },
  { name: "Shoes", image: images.shoes, href: "/#shoes" },
  { name: "Wallet", image: images.wallet, href: "/#wallet" },
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <Image
          src={images.women}
          alt="ShopEase fashion"
          fill
          priority
          sizes="100vw"
          className="about-hero__bg"
        />
        <div className="about-hero__overlay" />
        <div className="container about-hero__inner">
          <div className="about-hero__content">
            <span className="about-hero__badge">About ShopEase</span>
            <h1>Where Style Meets Simplicity</h1>
            <p>
              Your trusted online destination for women&apos;s and men&apos;s fashion.
              Curated collections, premium quality, and a shopping experience you&apos;ll love.
            </p>
            <div className="about-hero__buttons">
              <Link href="/" className="btn btn--primary">
                Shop Now
              </Link>
              <Link href="/contact" className="btn btn--outline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        <div className="about-stats">
          <div className="container about-stats__grid">
            {stats.map((stat) => (
              <div key={stat.label} className="about-stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-intro">
        <div className="container about-intro__inner">
          <div className="about-intro__image">
            <Image
              src={images.hero}
              alt="ShopEase store interior"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="about-intro__img"
            />
          </div>
          <div className="about-intro__text">
            <span className="about-label">Who We Are</span>
            <h2>Fashion Forward, Customer First</h2>
            <p>
              At ShopEase, we believe everyone deserves access to beautiful, well-made fashion
              without the overwhelm. Our team curates every product — from stunning stiletto heels
              and radiant makeup to timeless men&apos;s watches and leather wallets.
            </p>
            <p>
              Whether you&apos;re dressing for a special occasion or upgrading your everyday style,
              we&apos;re here to help you shop with confidence.
            </p>
            <Link href="/#reviews" className="about-link">
              Read customer reviews →
            </Link>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <div className="about-section-head">
            <span className="about-label">What Drives Us</span>
            <h2>Our Core Values</h2>
          </div>
          <div className="about-values__grid">
            {values.map((item) => (
              <article key={item.title} className={`about-value-card about-value-card--${item.accent}`}>
                <span className="about-value-card__icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-categories">
        <div className="container">
          <div className="about-section-head">
            <span className="about-label">Our Collections</span>
            <h2>What We Offer</h2>
            <p>Women&apos;s heels, makeup &amp; dresses · Men&apos;s watches, shoes &amp; wallets</p>
          </div>
          <div className="about-categories__grid">
            {categories.map((cat) => (
              <Link key={cat.name} href={cat.href} className="about-cat-card">
                <Image src={cat.image} alt={cat.name} fill sizes="200px" className="about-cat-card__img" />
                <div className="about-cat-card__overlay" />
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="about-perks">
        <div className="container">
          <div className="about-section-head about-section-head--light">
            <span className="about-label">Why ShopEase</span>
            <h2>Why Customers Love Us</h2>
          </div>
          <div className="about-perks__grid">
            {perks.map((perk) => (
              <div key={perk.title} className="about-perk">
                <span className="about-perk__icon">{perk.icon}</span>
                <strong>{perk.title}</strong>
                <span>{perk.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta-banner">
        <div className="container about-cta-banner__inner">
          <h2>Ready to Find Your Style?</h2>
          <p>Browse our collections or let our AI assistant help you discover the perfect products.</p>
          <div className="about-cta-banner__buttons">
            <Link href="/" className="btn btn--primary">
              Start Shopping
            </Link>
            <Link href="/#women" className="btn btn--outline-dark">
              Women&apos;s Collection
            </Link>
            <Link href="/#men" className="btn btn--outline-dark">
              Men&apos;s Collection
            </Link>
          </div>
        </div>
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
