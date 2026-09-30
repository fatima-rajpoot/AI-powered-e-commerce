"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { useReviews } from "@/context/ReviewContext";

export default function ReviewModal() {
  const { isModalOpen, closeReviewModal, addReview } = useReviews();
  const [productName, setProductName] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  if (!isModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !author.trim() || !comment.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    addReview({ productName, author: author.trim(), rating, comment: comment.trim() });
    setProductName("");
    setAuthor("");
    setRating(5);
    setComment("");
    setError("");
  };

  return (
    <>
      <button type="button" className="review-overlay" aria-label="Close" onClick={closeReviewModal} />
      <div className="review-modal" role="dialog" aria-label="Review a product">
        <div className="review-modal__header">
          <h2>Review a Product</h2>
          <button type="button" onClick={closeReviewModal} aria-label="Close">
            ✕
          </button>
        </div>

        <form className="review-modal__form" onSubmit={handleSubmit}>
          {error && <p className="review-modal__error">{error}</p>}

          <label>
            Product
            <select value={productName} onChange={(e) => setProductName(e.target.value)} required>
              <option value="">Select a product</option>
              {products.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Your Name
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </label>

          <label>
            Rating
            <div className="review-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`review-star${star <= rating ? " review-star--active" : ""}`}
                  onClick={() => setRating(star)}
                  aria-label={`${star} star`}
                >
                  ★
                </button>
              ))}
            </div>
          </label>

          <label>
            Your Review
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this product..."
              rows={4}
              required
            />
          </label>

          <button type="submit" className="btn btn--primary review-modal__submit">
            Submit Review
          </button>
        </form>
      </div>
    </>
  );
}
