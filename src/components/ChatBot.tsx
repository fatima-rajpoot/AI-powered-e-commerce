"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ChatProductResult } from "@/lib/chatAssistant";
import { getChatResponse } from "@/lib/chatAssistant";
import { subCategoryLabels, products } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
  products?: ChatProductResult[];
  suggestions?: string[];
}

const WELCOME: Message = {
  id: 0,
  role: "bot",
  text: "Hi! I'm ShopEase AI — ask me anything and I'll find products instantly.",
  suggestions: ["Women's heels", "Makeup under $50", "Men's watches", "Evening dress"],
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { id: Date.now(), role: "user", text: trimmed }]);
    setInput("");

    const data = getChatResponse(trimmed);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        role: "bot",
        text: data.reply,
        products: data.products,
        suggestions: data.suggestions,
      },
    ]);
  };

  const handleAddFromChat = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) addToCart(product);
  };

  return (
    <>
      <button
        type="button"
        className={`chat-fab${open ? " chat-fab--open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open AI shopping assistant"}
        aria-expanded={open}
      >
        {open ? (
          "✕"
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3c-4.4 0-8 2.7-8 6v4c0 2.2 1.8 4 4 4h1l2 3 4-3h1c2.2 0 4-1.8 4-4V9c0-3.3-3.6-6-8-6Z" />
            <circle cx="9" cy="11" r="1" fill="currentColor" stroke="none" />
            <circle cx="12" cy="11" r="1" fill="currentColor" stroke="none" />
            <circle cx="15" cy="11" r="1" fill="currentColor" stroke="none" />
          </svg>
        )}
      </button>

      {open && (
        <div className="chat-panel" role="dialog" aria-label="AI shopping assistant">
          <div className="chat-panel__header">
            <div>
              <h3>ShopEase AI</h3>
              <span>Instant answers · No wait</span>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">
              ✕
            </button>
          </div>

          <div className="chat-panel__messages" ref={listRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-bubble chat-bubble--${msg.role}`}>
                <p>{msg.text}</p>

                {msg.products && msg.products.length > 0 && (
                  <ul className="chat-products">
                    {msg.products.map((product) => (
                      <li key={product.id} className="chat-product">
                        <div className="chat-product__thumb">
                          <Image src={product.image} alt={product.name} fill sizes="48px" />
                        </div>
                        <div className="chat-product__info">
                          <strong>{product.name}</strong>
                          <span>
                            {subCategoryLabels[product.subCategory]} · ${product.price.toFixed(2)}
                          </span>
                        </div>
                        <div className="chat-product__actions">
                          <a href={product.anchor} onClick={() => setOpen(false)}>
                            View
                          </a>
                          <button type="button" onClick={() => handleAddFromChat(product.id)}>
                            Add
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="chat-suggestions">
                    {msg.suggestions.map((s) => (
                      <button key={s} type="button" onClick={() => sendMessage(s)}>
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <form
            className="chat-panel__input"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Try: heels under $150..."
              aria-label="Message"
            />
            <button type="submit" disabled={!input.trim()} aria-label="Send">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m22 2-11 11M22 2 15 22l-4-9-9-4 20-7Z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
