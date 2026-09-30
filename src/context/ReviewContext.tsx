"use client";

import { createContext, useCallback, useContext, useState } from "react";

export interface Review {
  id: number;
  productName: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewContextValue {
  reviews: Review[];
  isModalOpen: boolean;
  openReviewModal: () => void;
  closeReviewModal: () => void;
  addReview: (review: Omit<Review, "id" | "date">) => void;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    productName: "Stiletto Heels",
    author: "Sarah M.",
    rating: 5,
    comment: "Absolutely stunning! Comfortable for a stiletto and looks amazing.",
    date: "2026-01-15",
  },
  {
    id: 2,
    productName: "Classic Chronograph",
    author: "James K.",
    rating: 5,
    comment: "Great quality watch. Looks even better in person.",
    date: "2026-01-22",
  },
  {
    id: 3,
    productName: "Silk Wrap Dress",
    author: "Emily R.",
    rating: 4,
    comment: "Beautiful dress for evening events. Fits perfectly.",
    date: "2026-02-03",
  },
];

const ReviewContext = createContext<ReviewContextValue | null>(null);

export function ReviewProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openReviewModal = useCallback(() => setIsModalOpen(true), []);
  const closeReviewModal = useCallback(() => setIsModalOpen(false), []);

  const addReview = useCallback((review: Omit<Review, "id" | "date">) => {
    setReviews((prev) => [
      {
        ...review,
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
      },
      ...prev,
    ]);
    setIsModalOpen(false);
  }, []);

  return (
    <ReviewContext.Provider
      value={{ reviews, isModalOpen, openReviewModal, closeReviewModal, addReview }}
    >
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error("useReviews must be used within ReviewProvider");
  }
  return context;
}
