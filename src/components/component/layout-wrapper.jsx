// import { Footer } from "./footer";

import { Header } from "./header";

export default function LayoutWrapper({
  children,
  showHeader = true,
  // showFooter = true,
}) {
  return (
    <div className="flex flex-col min-h-screen  ">
      {showHeader && <Header />}

      {children}
      {/* {showFooter && <Footer />} */}
    </div>
  );
}
