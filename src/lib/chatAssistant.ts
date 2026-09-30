import type { Product, SubCategory } from "@/data/products";
import { products, subCategoryLabels } from "@/data/products";

export interface ChatProductResult {
  id: number;
  name: string;
  price: number;
  subCategory: SubCategory;
  image: string;
  description: string;
  anchor: string;
}

export interface ChatResponse {
  reply: string;
  products: ChatProductResult[];
  suggestions: string[];
}

const SUB_KEYWORDS: Record<SubCategory, string[]> = {
  heels: ["heel", "heels", "stiletto", "pump", "sandals"],
  makeup: ["makeup", "lipstick", "foundation", "beauty", "cosmetic", "mascara", "eyeshadow", "blush"],
  dress: ["dress", "dresses", "gown", "outfit"],
  watches: ["watch", "watches", "timepiece", "chronograph"],
  shoes: ["shoe", "shoes", "sneaker", "sneakers", "loafer", "oxford", "footwear"],
  wallet: ["wallet", "wallets", "card holder", "leather accessory"],
};

function toResult(product: Product): ChatProductResult {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    subCategory: product.subCategory,
    image: product.image,
    description: product.description,
    anchor: `#${product.subCategory}`,
  };
}

function parseMaxPrice(message: string): number | null {
  const under = message.match(/(?:under|below|less than|max|budget)\s*\$?\s*(\d+)/i);
  if (under) return Number(under[1]);

  if (/\b(cheap|affordable|budget)\b/i.test(message)) return 80;
  if (/\b(expensive|premium|luxury)\b/i.test(message)) return null;

  return null;
}

function parseMinPrice(message: string): number | null {
  const over = message.match(/(?:over|above|more than|min)\s*\$?\s*(\d+)/i);
  if (over) return Number(over[1]);

  if (/\b(expensive|premium|luxury)\b/i.test(message)) return 120;

  return null;
}

function detectSubCategories(message: string): SubCategory[] {
  const lower = message.toLowerCase();
  return (Object.entries(SUB_KEYWORDS) as [SubCategory, string[]][])
    .filter(([, keywords]) => keywords.some((kw) => lower.includes(kw)))
    .map(([sub]) => sub);
}

function detectMainCategory(message: string): "women" | "men" | null {
  const lower = message.toLowerCase();
  if (/\b(women|woman|ladies|lady|female|her|she)\b/.test(lower)) return "women";
  if (/\b(men|man|male|him|he|gentleman)\b/.test(lower)) return "men";
  return null;
}

function scoreProduct(product: Product, message: string): number {
  const lower = message.toLowerCase();
  let score = 0;

  const words = lower.split(/\s+/).filter((w) => w.length > 2);
  for (const word of words) {
    if (product.name.toLowerCase().includes(word)) score += 3;
    if (product.description.toLowerCase().includes(word)) score += 2;
    if (product.subCategory.includes(word)) score += 2;
  }

  return score;
}

export function getChatResponse(message: string): ChatResponse {
  const trimmed = message.trim();
  const lower = trimmed.toLowerCase();

  if (!trimmed) {
    return {
      reply: "Ask me anything about our products! Try one of the suggestions below.",
      products: [],
      suggestions: ["Women's heels", "Makeup under $50", "Men's watches", "Dresses for events"],
    };
  }

  if (/^(hi|hello|hey|good morning|good evening)\b/i.test(lower)) {
    return {
      reply:
        "Hello! I'm your ShopEase AI assistant. I can help you find heels, makeup, dresses, watches, shoes, and wallets. What are you looking for today?",
      products: [],
      suggestions: ["Show women's dresses", "Cheap men's shoes", "Makeup gift ideas"],
    };
  }

  if (/help|what can you do|how do you work/i.test(lower)) {
    return {
      reply:
        "I search our catalog instantly based on what you describe. Try a category (heels, makeup, watches…), a price (under $100), or an occasion (party dress, everyday sneakers).",
      products: [],
      suggestions: ["Heels under $150", "Men's leather wallet", "Evening dress"],
    };
  }

  if (/about|who are you|shop ease|shopease|your store/i.test(lower)) {
    return {
      reply:
        "ShopEase is your fashion destination for Women (heels, makeup, dresses) and Men (watches, shoes, wallets). Visit our About page to learn more!",
      products: [],
      suggestions: ["Women's heels", "Men's watches", "Dresses for events"],
    };
  }

  if (/shipping|delivery|ship/i.test(lower)) {
    return {
      reply: "We offer free shipping on all orders over $50. Standard delivery takes 3–5 business days.",
      products: [],
      suggestions: ["Women's heels", "Men's shoes", "Makeup under $50"],
    };
  }

  if (/return|refund|exchange/i.test(lower)) {
    return {
      reply: "We have a 30-day easy return policy. Items must be unused with original tags attached.",
      products: [],
      suggestions: ["Women's dress", "Men's wallet", "Cheap heels"],
    };
  }

  const subs = detectSubCategories(lower);
  const main = detectMainCategory(lower);
  const maxPrice = parseMaxPrice(lower);
  const minPrice = parseMinPrice(lower);

  let filtered = [...products];

  if (main) {
    filtered = filtered.filter((p) => p.mainCategory === main);
  }

  if (subs.length > 0) {
    filtered = filtered.filter((p) => subs.includes(p.subCategory));
  }

  if (maxPrice !== null) {
    filtered = filtered.filter((p) => p.price <= maxPrice);
  }

  if (minPrice !== null) {
    filtered = filtered.filter((p) => p.price >= minPrice);
  }

  if (filtered.length === 0) {
    filtered = products
      .map((p) => ({ product: p, score: scoreProduct(p, lower) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.product);
  } else {
    filtered.sort((a, b) => scoreProduct(b, lower) - scoreProduct(a, lower));
  }

  const results = filtered.slice(0, 4).map(toResult);

  if (results.length === 0) {
    return {
      reply:
        "I couldn't find a match for that. We have Women's (heels, makeup, dress) and Men's (watches, shoes, wallet). Try being more specific!",
      products: [],
      suggestions: ["Women's heels", "Men's watches", "Summer dresses", "Wallet under $60"],
    };
  }

  const categoryLabel =
    subs.length === 1
      ? subCategoryLabels[subs[0]]
      : main === "women"
        ? "women's"
        : main === "men"
          ? "men's"
          : "";

  const priceNote =
    maxPrice !== null ? ` under $${maxPrice}` : minPrice !== null ? ` over $${minPrice}` : "";

  return {
    reply: `I found ${results.length} great ${categoryLabel} pick${results.length > 1 ? "s" : ""}${priceNote} for you:`,
    products: results,
    suggestions: [
      subs[0] === "heels" ? "Makeup under $50" : "Women's heels",
      main === "men" ? "Men's shoes" : "Men's watches",
      "Party dress",
    ],
  };
}
