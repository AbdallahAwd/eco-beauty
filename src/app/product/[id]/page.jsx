import LayoutWrapper from "@/components/component/layout-wrapper";
import { ProductPage } from "@/components/component/product/product-page";

export default function product({ params }) {
  const { id } = params;

  // Fetch or use data for the product
  if (!id) {
    return notFound(); // Handle not found scenario
  }
  return (
    <LayoutWrapper>
      <ProductPage />
    </LayoutWrapper>
  );
}
