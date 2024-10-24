"use client";

import { Factory, Grid, Heart, Home, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LoginDialog } from "./auth/login-dialog";

// This is the main BottomNavBar component
export default function BottomNavBar() {
  const pathname = usePathname();

  // Function to check if a path matches the current pathname
  const isPathActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path === "/category/all" && pathname.startsWith("/category"))
      return true;
    return pathname === path;
  };

  return (
    <nav className="block md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-between max-w-md mx-auto px-4 py-2">
        <NavItem
          label="Home"
          icon={<Home className="w-6 h-6" />}
          isActive={isPathActive("/")}
          href="/"
        />
        <NavItem
          label="Categories"
          icon={<Grid className="w-6 h-6" />}
          isActive={isPathActive("/category/all")}
          href="/category/all"
        />
        <NavItem
          label="Favorites"
          icon={<Heart className="w-6 h-6" />}
          isActive={isPathActive("/favorites")}
          href="/favorites"
        />

        <NavItem
          label="Account"
          icon={<User className="w-6 h-6" />}
          isActive={isPathActive("/account")}
          href="/account"
        />

        <NavItem
          label="Cart"
          icon={<ShoppingCart className="w-6 h-6" />}
          isActive={isPathActive("/cart")}
          href="/cart"
          badgeCount={1} // Show a badge on cart icon if needed
        />
      </div>
    </nav>
  );
}

// NavItem component to be used inside BottomNavBar
function NavItem({ label, icon, isActive, href, badgeCount, onClick }) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center min-w-[4rem] relative ${
        isActive ? "text-base-600" : "text-gray-600"
      }`}
      onClick={onClick}
    >
      <div className="relative">
        {icon}
        {badgeCount && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {badgeCount}
          </span>
        )}
      </div>
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
}
