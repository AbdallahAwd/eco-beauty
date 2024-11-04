import LayoutWrapper from "@/components/component/layout-wrapper";
import { SearchPage } from "@/components/component/search/search-page";
import { Suspense } from "react";

export default function product() {
  return (
    <LayoutWrapper>
      <Suspense fallback={<p>Loading search results...</p>}>
        <SearchPage />
      </Suspense>
    </LayoutWrapper>
  );
}
