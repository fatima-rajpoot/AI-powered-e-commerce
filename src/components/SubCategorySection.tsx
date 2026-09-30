import Image from "next/image";
import type { SubCategory } from "@/data/products";
import { products, subCategoryMeta } from "@/data/products";
import ProductCard from "./ProductCard";

interface SubCategorySectionProps {
  subCategory: SubCategory;
}

export default function SubCategorySection({ subCategory }: SubCategorySectionProps) {
  const meta = subCategoryMeta[subCategory];
  const subProducts = products.filter((p) => p.subCategory === subCategory);

  return (
    <div id={subCategory} className="subcategory-section">
      <div className="subcategory-section__banner">
        <Image
          src={meta.background}
          alt={`${meta.title} collection`}
          fill
          sizes="100vw"
          className="subcategory-section__bg"
        />
        <div className="subcategory-section__overlay" />
        <div className="container subcategory-section__header">
          <h3>{meta.title}</h3>
          <p>{meta.subtitle}</p>
          <span className="subcategory-section__count">{subProducts.length} items</span>
        </div>
      </div>

      <div className="container">
        <div className="products__grid">
          {subProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
