import Image from "next/image";
import Link from "next/link";
import MainCategorySection from "@/components/MainCategorySection";
import ReviewsSection from "@/components/ReviewsSection";
import { images } from "@/lib/images";
import { mainCategoryMeta } from "@/data/products";

const womenSubs = mainCategoryMeta.women.subcategories;
const menSubs = mainCategoryMeta.men.subcategories;

export default function Home() {
  return (
    <main>
      <section className="hero">
        <Image
          src={images.hero}
          alt="Fashion store interior"
          fill
          priority
          sizes="100vw"
          className="hero__bg"
        />
        <div className="hero__overlay" />
        <div className="container hero__inner">
          <div className="hero__content">
            <span className="hero__badge">New Season 2026</span>
            <h1>Women &amp; Men Collections</h1>
            <p>
              Shop heels, makeup, dresses, watches, shoes, and wallets.
              Premium quality with styles you&apos;ll love.
            </p>
            <div className="hero__buttons">
              <a href="#women" className="btn btn--primary">
                Shop Women
              </a>
              <a href="#men" className="btn btn--outline">
                Shop Men
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="category-cards">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>

          <div className="category-group">
            <h3 className="category-group__title">Women</h3>
            <div className="category-cards__grid category-cards__grid--3">
              {womenSubs.map((sub) => (
                <a key={sub} href={`#${sub}`} className={`category-card category-card--${sub}`}>
                  <Image
                    src={sub === "heels" ? images.heels : sub === "makeup" ? images.makeup : images.dress}
                    alt={`${sub} collection`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="category-card__bg"
                  />
                  <div className="category-card__overlay" />
                  <div className="category-card__content">
                    <h4>{sub.charAt(0).toUpperCase() + sub.slice(1)}</h4>
                    <span className="category-card__cta">Shop now →</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="category-group">
            <h3 className="category-group__title">Men</h3>
            <div className="category-cards__grid category-cards__grid--3">
              {menSubs.map((sub) => (
                <a key={sub} href={`#${sub}`} className={`category-card category-card--${sub}`}>
                  <Image
                    src={
                      sub === "watches" ? images.watches : sub === "shoes" ? images.shoes : images.wallet
                    }
                    alt={`${sub} collection`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="category-card__bg"
                  />
                  <div className="category-card__overlay" />
                  <div className="category-card__content">
                    <h4>{sub.charAt(0).toUpperCase() + sub.slice(1)}</h4>
                    <span className="category-card__cta">Shop now →</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MainCategorySection category="women" />
      <MainCategorySection category="men" />

      <ReviewsSection />

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
