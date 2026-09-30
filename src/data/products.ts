import { images } from "@/lib/images";

export type MainCategory = "women" | "men";
export type SubCategory = "heels" | "makeup" | "dress" | "watches" | "shoes" | "wallet";

export interface Product {
  id: number;
  name: string;
  mainCategory: MainCategory;
  subCategory: SubCategory;
  price: number;
  image: string;
  description: string;
}

export const subCategoryLabels: Record<SubCategory, string> = {
  heels: "Heels",
  makeup: "Makeup",
  dress: "Dress",
  watches: "Watches",
  shoes: "Shoes",
  wallet: "Wallet",
};

export const mainCategoryMeta = {
  women: {
    title: "Women",
    subtitle: "Heels, makeup & dresses for every occasion",
    background: images.women,
    subcategories: ["heels", "makeup", "dress"] as SubCategory[],
  },
  men: {
    title: "Men",
    subtitle: "Watches, shoes & wallets crafted for style",
    background: images.men,
    subcategories: ["watches", "shoes", "wallet"] as SubCategory[],
  },
} as const;

export const subCategoryMeta: Record<
  SubCategory,
  { title: string; subtitle: string; background: string }
> = {
  heels: {
    title: "Heels",
    subtitle: "Step out in style",
    background: images.heels,
  },
  makeup: {
    title: "Makeup",
    subtitle: "Beauty essentials for every look",
    background: images.makeup,
  },
  dress: {
    title: "Dress",
    subtitle: "Elegant dresses for any event",
    background: images.dress,
  },
  watches: {
    title: "Watches",
    subtitle: "Timeless timepieces",
    background: images.watches,
  },
  shoes: {
    title: "Shoes",
    subtitle: "Footwear for every step",
    background: images.shoes,
  },
  wallet: {
    title: "Wallet",
    subtitle: "Premium leather accessories",
    background: images.wallet,
  },
};

export const products: Product[] = [
  {
    id: 1,
    name: "Stiletto Heels",
    mainCategory: "women",
    subCategory: "heels",
    price: 149.99,
    image: images.heels,
    description: "Classic pointed-toe stilettos in glossy patent leather.",
  },
  {
    id: 2,
    name: "Block Heel Sandals",
    mainCategory: "women",
    subCategory: "heels",
    price: 119.0,
    image: images.heel2,
    description: "Comfortable block heels perfect for all-day wear.",
  },
  {
    id: 3,
    name: "Ankle Strap Heels",
    mainCategory: "women",
    subCategory: "heels",
    price: 134.5,
    image: images.heel3,
    description: "Elegant ankle-strap design with a slim mid heel.",
  },
  {
    id: 4,
    name: "Platform Pumps",
    mainCategory: "women",
    subCategory: "heels",
    price: 159.99,
    image: images.heel4,
    description: "Bold platform pumps with a statement silhouette.",
  },
  {
    id: 5,
    name: "Matte Lipstick Set",
    mainCategory: "women",
    subCategory: "makeup",
    price: 42.99,
    image: images.makeup2,
    description: "Six long-wear matte shades for every occasion.",
  },
  {
    id: 6,
    name: "Glow Foundation",
    mainCategory: "women",
    subCategory: "makeup",
    price: 38.5,
    image: images.makeup,
    description: "Lightweight foundation with a natural radiant finish.",
  },
  {
    id: 7,
    name: "Eyeshadow Palette",
    mainCategory: "women",
    subCategory: "makeup",
    price: 54.99,
    image: images.makeup3,
    description: "12 versatile shades from everyday neutrals to bold glam.",
  },
  {
    id: 8,
    name: "Blush & Highlight Duo",
    mainCategory: "women",
    subCategory: "makeup",
    price: 32.0,
    image: images.makeup4,
    description: "Buildable blush paired with a luminous highlighter.",
  },
  {
    id: 9,
    name: "Silk Wrap Dress",
    mainCategory: "women",
    subCategory: "dress",
    price: 129.99,
    image: images.dress,
    description: "Elegant midi dress with a flattering wrap silhouette.",
  },
  {
    id: 10,
    name: "Floral Summer Dress",
    mainCategory: "women",
    subCategory: "dress",
    price: 89.99,
    image: images.dress2,
    description: "Lightweight floral print dress for warm days.",
  },
  {
    id: 11,
    name: "Evening Gown",
    mainCategory: "women",
    subCategory: "dress",
    price: 199.0,
    image: images.dress3,
    description: "Floor-length gown for formal events and galas.",
  },
  {
    id: 12,
    name: "Casual Midi Dress",
    mainCategory: "women",
    subCategory: "dress",
    price: 74.99,
    image: images.dress4,
    description: "Soft knit midi dress for everyday elegance.",
  },
  {
    id: 13,
    name: "Classic Chronograph",
    mainCategory: "men",
    subCategory: "watches",
    price: 249.99,
    image: images.watches,
    description: "Stainless steel chronograph with leather strap.",
  },
  {
    id: 14,
    name: "Minimalist Watch",
    mainCategory: "men",
    subCategory: "watches",
    price: 179.0,
    image: images.watch2,
    description: "Slim profile watch with a clean dial design.",
  },
  {
    id: 15,
    name: "Sport Digital Watch",
    mainCategory: "men",
    subCategory: "watches",
    price: 129.99,
    image: images.watch3,
    description: "Water-resistant watch with fitness tracking features.",
  },
  {
    id: 16,
    name: "Luxury Gold Watch",
    mainCategory: "men",
    subCategory: "watches",
    price: 399.0,
    image: images.watch4,
    description: "Premium gold-tone timepiece for special occasions.",
  },
  {
    id: 17,
    name: "Leather Sneakers",
    mainCategory: "men",
    subCategory: "shoes",
    price: 119.0,
    image: images.shoes,
    description: "Minimal white sneakers with leather upper.",
  },
  {
    id: 18,
    name: "Running Shoes",
    mainCategory: "men",
    subCategory: "shoes",
    price: 99.99,
    image: images.shoe2,
    description: "Lightweight runners with responsive cushioning.",
  },
  {
    id: 19,
    name: "Oxford Dress Shoes",
    mainCategory: "men",
    subCategory: "shoes",
    price: 149.5,
    image: images.shoe3,
    description: "Polished leather oxfords for formal occasions.",
  },
  {
    id: 20,
    name: "Casual Loafers",
    mainCategory: "men",
    subCategory: "shoes",
    price: 89.99,
    image: images.shoe4,
    description: "Slip-on loafers in soft suede finish.",
  },
  {
    id: 21,
    name: "Leather Bifold Wallet",
    mainCategory: "men",
    subCategory: "wallet",
    price: 49.99,
    image: images.wallet,
    description: "Classic bifold wallet with multiple card slots.",
  },
  {
    id: 22,
    name: "Slim Card Holder",
    mainCategory: "men",
    subCategory: "wallet",
    price: 35.0,
    image: images.wallet2,
    description: "Minimalist card holder for everyday carry.",
  },
  {
    id: 23,
    name: "Zip Around Wallet",
    mainCategory: "men",
    subCategory: "wallet",
    price: 59.99,
    image: images.wallet3,
    description: "Secure zip-around design with coin pocket.",
  },
  {
    id: 24,
    name: "Travel Wallet",
    mainCategory: "men",
    subCategory: "wallet",
    price: 69.0,
    image: images.wallet4,
    description: "Passport-sized wallet with RFID protection.",
  },
];
