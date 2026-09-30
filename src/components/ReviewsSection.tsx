"use client";

import { useReviews } from "@/context/ReviewContext";

function Stars({ count }: { count: number }) {
  return (
    <span className="review-card__stars" aria-label={`${count} out of 5 stars`}>
      {"★".repeat(count)}
      {"☆".repeat(5 - count)}
    </span>
  );
}

export default function ReviewsSection() {
  const { reviews, openReviewModal } = useReviews();

  return (
    <section id="reviews" className="reviews-section">
      <div className="container">
        <div className="reviews-section__header">
          <div>
            <h2 className="section-title">Customer Reviews</h2>
            <p className="reviews-section__subtitle">See what our shoppers are saying</p>
          </div>
          <button type="button" className="btn btn--primary" onClick={openReviewModal}>
            Review a Product
          </button>
        </div>

        <div className="reviews-grid">
          {reviews.map((review) => (
            <article key={review.id} className="review-card">
              <div className="review-card__top">
                <Stars count={review.rating} />
                <time dateTime={review.date}>{review.date}</time>
              </div>
              <h3>{review.productName}</h3>
              <p className="review-card__comment">&ldquo;{review.comment}&rdquo;</p>
              <span className="review-card__author">— {review.author}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
