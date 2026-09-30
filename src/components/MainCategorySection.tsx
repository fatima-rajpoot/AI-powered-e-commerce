import Image from "next/image";
import type { MainCategory } from "@/data/products";
import { mainCategoryMeta } from "@/data/products";
import SubCategorySection from "./SubCategorySection";

interface MainCategorySectionProps {
  category: MainCategory;
}

export default function MainCategorySection({ category }: MainCategorySectionProps) {
  const meta = mainCategoryMeta[category];

  return (
    <section id={category} className="main-category">
      <div className="main-category__hero">
        <Image
          src={meta.background}
          alt={`${meta.title} collection`}
          fill
          priority={category === "women"}
          sizes="100vw"
          className="main-category__bg"
        />
        <div className="main-category__overlay" />
        <div className="container main-category__content">
          <span className="main-category__label">Shop</span>
          <h2>{meta.title}</h2>
          <p>{meta.subtitle}</p>
          <div className="main-category__tabs">
            {meta.subcategories.map((sub) => (
              <a key={sub} href={`#${sub}`} className="main-category__tab">
                {sub.charAt(0).toUpperCase() + sub.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="main-category__subs">
        {meta.subcategories.map((sub) => (
          <SubCategorySection key={sub} subCategory={sub} />
        ))}
      </div>
    </section>
  );
}
