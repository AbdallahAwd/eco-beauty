// import { Footer } from "./footer";
"use client";
import Footer from "./footer";
import { Header } from "./header";

import BottomNavBar from "./navbar";

export default function LayoutWrapper({
  children,
  showHeader = true,
  showFooter = true,
}) {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden ">
      {showHeader && <Header />}

      <main className="flex-grow">{children}</main>
      <BottomNavBar />
      {showFooter && <Footer />}
    </div>
  );
}
