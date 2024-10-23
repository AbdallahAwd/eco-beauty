import LayoutWrapper from "@/components/component/layout-wrapper";
import { HeroSlider } from "@/components/component/landing/hero-slider";
import { FeaturedProducts } from "@/components/component/landing/featured-products";
import { CategoriesSection } from "@/components/component/landing/categories-section";
import { TestimonialsSlider } from "@/components/component/landing/testimonials-slider";
import { NewsletterSignup } from "@/components/component/landing/newsletter-signup";

export default function Home() {
  const categories = [
    "Skincare",
    "Haircare",
    "Body Care",
    "Makeup",
    "Fragrance",
    "Nails",
    "Tools",
  ];
  return (
    <LayoutWrapper>
      <HeroSlider />
      <FeaturedProducts />
      <CategoriesSection />
      {categories.map((category, index) => (
        <FeaturedProducts key={index} category={category} />
      ))}
      <TestimonialsSlider />
      <NewsletterSignup />
    </LayoutWrapper>
  );
}
