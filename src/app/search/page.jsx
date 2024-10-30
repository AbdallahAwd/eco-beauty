import LayoutWrapper from "@/components/component/layout-wrapper";
import { SearchPage } from "@/components/component/search/search-page";

export default function product({ params }) {
  return (
    <LayoutWrapper>
      <SearchPage />
    </LayoutWrapper>
  );
}
