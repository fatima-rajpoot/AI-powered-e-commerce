"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useReviews } from "@/context/ReviewContext";

export default function Header() {
  const { cartCount, openCart } = useCart();
  const { openReviewModal } = useReviews();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="header">
      <div className="container header__inner">
        <Link href="/" className="logo">
          ShopEase
        </Link>

        <nav className="nav" aria-label="Main navigation">
          <ul className="nav__list">
            <li className="nav__dropdown">
              <a href="/#women" className="nav__link">
                Women
              </a>
              <ul className="nav__sublist">
                <li><a href="/#heels">Heels</a></li>
                <li><a href="/#makeup">Makeup</a></li>
                <li><a href="/#dress">Dress</a></li>
              </ul>
            </li>
            <li className="nav__dropdown">
              <a href="/#men" className="nav__link">
                Men
              </a>
              <ul className="nav__sublist">
                <li><a href="/#watches">Watches</a></li>
                <li><a href="/#shoes">Shoes</a></li>
                <li><a href="/#wallet">Wallet</a></li>
              </ul>
            </li>
            <li>
              <Link
                href="/about"
                className={`nav__link${isActive("/about") ? " nav__link--active" : ""}`}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`nav__link${isActive("/contact") ? " nav__link--active" : ""}`}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header__actions">
          <button type="button" className="btn btn--review" onClick={openReviewModal}>
            <span className="btn--review__short">Review</span>
            <span className="btn--review__full">Review a Product</span>
          </button>
          <button type="button" className="icon-btn cart-btn" aria-label="Cart" onClick={openCart}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
