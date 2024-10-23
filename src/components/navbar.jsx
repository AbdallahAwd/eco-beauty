// BottomNavBar.jsx
"use client";
import { Factory, Grid, Heart, Home, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// This is the main BottomNavBar component
export default function BottomNavBar() {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t shadow-md flex justify-around py-2">
      <NavItem
        label="Home"
        icon={<Home className="h-6 w-6" />}
        isActive={activeTab === "home"}
        onClick={() => handleTabChange("home")}
        href="/"
      />
      <NavItem
        label="Categories"
        icon={<Grid className="h-6 w-6" />}
        isActive={activeTab === "categories"}
        onClick={() => handleTabChange("categories")}
        href="/categories"
      />
      <NavItem
        label="Favorites"
        icon={<Heart className="h-6 w-6" />}
        isActive={activeTab === "fashion"}
        onClick={() => handleTabChange("fashion")}
        href="/fashion"
      />
      <NavItem
        label="My Account"
        icon={<User className="h-6 w-6" />}
        isActive={activeTab === "account"}
        onClick={() => handleTabChange("account")}
        href="/account"
      />
      <NavItem
        label="Cart"
        icon={<ShoppingCart className="h-6 w-6" />}
        isActive={activeTab === "cart"}
        onClick={() => handleTabChange("cart")}
        href="/cart"
        badgeCount={1} // Show a badge on cart icon if needed
      />
    </nav>
  );
}

// NavItem component to be used inside BottomNavBar
function NavItem({ label, icon, isActive, onClick, href, badgeCount }) {
  return (
    <Link href={href}>
      <div
        onClick={onClick}
        className={`flex flex-col items-center justify-center px-4 py-2 cursor-pointer transition-all duration-200 ${
          isActive ? "text-green-600" : "text-gray-500"
        }`}
      >
        <div className="relative">
          {icon}
          {badgeCount && (
            <span className="absolute top-0 right-0 text-xs bg-red-600 text-white rounded-full px-1">
              {badgeCount}
            </span>
          )}
        </div>
        <span className="text-xs">{label}</span>
      </div>
    </Link>
  );
}
