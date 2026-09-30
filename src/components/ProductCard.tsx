"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/data/products";
import { subCategoryLabels } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="product-card__image"
        />
        <span className={`product-card__badge product-card__badge--${product.subCategory}`}>
          {subCategoryLabels[product.subCategory]}
        </span>
      </div>
      <div className="product-card__body">
        <h3>{product.name}</h3>
        <p className="product-card__desc">{product.description}</p>
        <div className="product-card__footer">
          <span className="product-card__price">${product.price.toFixed(2)}</span>
          <button
            type="button"
            className={`product-card__btn${added ? " product-card__btn--added" : ""}`}
            onClick={handleAdd}
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
