"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Package,
  LayoutDashboard,
  ShoppingCart,
  BarChart2,
  PieChart,
  Users,
  Megaphone,
  Settings,
  Menu,
  X,
} from "lucide-react";

const sidebarItems = [
  { name: "Dashboard Overview", icon: LayoutDashboard, href: "/dashbaord" },
  { name: "Products Management", icon: Package, href: "/dashbaord/products" },
  { name: "Orders & Shipping", icon: ShoppingCart, href: "/dashbaord/orders" },
  { name: "Inventory & Stock", icon: BarChart2, href: "/dashbaord/inventory" },
  { name: "Sales & Revenue", icon: PieChart, href: "/dashbaord/sales" },
  { name: "Customer Management", icon: Users, href: "/dashbaord/customers" },
  {
    name: "Marketing & Campaigns",
    icon: Megaphone,
    href: "/dashbaord/marketing",
  },
  { name: "Analytics & Reports", icon: PieChart, href: "/dashbaord/analytics" },
  { name: "Settings", icon: Settings, href: "/dashbaord/settings" },
];

export function Sidebar() {
  const pathname = usePathname(); // Get the current route
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <Button
        variant="ghost"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-center h-16 border-b">
          <Package className="h-8 w-8 text-green-600 mr-2" />
          <span className="text-xl font-bold text-gray-800">EcoBeauty</span>
        </div>
        <nav className="mt-4 overflow-y-auto h-[calc(100vh-4rem)]">
          {sidebarItems.map((item) => (
            <div key={item.name} className="mb-2 px-4">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  pathname === item.href
                    ? "bg-gray-200 font-bold text-green-600"
                    : "text-gray-700"
                )}
                onClick={() => router.push(item.href)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            </div>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
