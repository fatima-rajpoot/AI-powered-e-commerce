"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, cartCount, isOpen, closeCart, removeFromCart, checkout } = useCart();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="cart-overlay"
          aria-label="Close cart"
          onClick={closeCart}
        />
      )}

      <aside className={`cart-drawer${isOpen ? " cart-drawer--open" : ""}`} aria-label="Shopping cart">
        <div className="cart-drawer__header">
          <h2>Your Cart ({cartCount})</h2>
          <button type="button" className="cart-drawer__close" onClick={closeCart} aria-label="Close">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <p>Your cart is empty</p>
            <span>Add items using the &quot;Add to Cart&quot; button</span>
          </div>
        ) : (
          <>
            <ul className="cart-drawer__list">
              {items.map((item) => (
                <li key={item.id} className="cart-drawer__item">
                  <div className="cart-drawer__thumb">
                    <Image src={item.image} alt={item.name} fill sizes="64px" />
                  </div>
                  <div className="cart-drawer__info">
                    <p className="cart-drawer__name">{item.name}</p>
                    <p className="cart-drawer__price">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="cart-drawer__remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="cart-drawer__footer">
              <div className="cart-drawer__total">
                <span>Total</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
              <button
                type="button"
                className="btn btn--primary cart-drawer__checkout"
                onClick={checkout}
              >
                Checkout — ${total.toFixed(2)}
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
