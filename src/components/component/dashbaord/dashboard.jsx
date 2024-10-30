"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Button } from "@/components/ui/button";
import {
  Package,
  ShoppingCart,
  Users,
  LayoutDashboard,
  BarChart2,
  Megaphone,
  PieChart,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { Sidebar } from "./home/side-bar";
import HeaderButtons from "./home/header-buttons";
import { TopProducts } from "./home/top-products";
import { SalesSummary } from "./home/sales-summary";
import { TopSellingProducts } from "./home/top-selling-products";
import { CustomerGrowth } from "./home/customer-growth";
import { OrderBreakdown } from "./home/order-breakdown";
import { RecentOrders } from "./home/recent-orders";
import DashboardLayout from "./dashboard-layout";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const salesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Sales",
      data: [12000, 19000, 15000, 22000, 18000, 25000],
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

const topProductsData = {
  labels: [
    "Organic Rose Face Serum",
    "Natural Coconut Shampoo",
    "Vegan Matte Lipstick",
    "Aloe Vera Moisturizer",
    "Organic Sunscreen SPF 30",
    "Green Tea Toner",
    "Lavender Night Cream",
  ],
  datasets: [
    {
      label: "Units Sold",
      data: [1200, 980, 850, 720, 650, 580, 500],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
        "rgba(199, 199, 199, 0.6)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(199, 199, 199, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const customerGrowthData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "New Customers",
      data: [50, 65, 80, 95, 110, 130],
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.5)",
      tension: 0.1,
    },
    {
      label: "Returning Customers",
      data: [150, 160, 165, 180, 190, 210],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      tension: 0.1,
    },
  ],
};

const orderBreakdownData = {
  labels: ["Pending", "Processing", "Completed", "Returned"],
  datasets: [
    {
      data: [30, 50, 200, 20],
      backgroundColor: [
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 99, 132, 0.6)",
      ],
    },
  ],
};

export function DashboardComponent() {
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Sidebar Toggle Button for Mobile */}
      <Button
        variant="ghost"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      {/* Left Sidebar */}

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-64 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* add buttons */}
          <HeaderButtons />
          {/* Top Cards Analytics */}
          <TopProducts />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            {/* Sales Summary */}
            <SalesSummary salesData={salesData} />
            {/* Top Selling Products */}
            <TopSellingProducts topProductsData={topProductsData} />
            {/* Customer Growth */}
            <CustomerGrowth customerGrowthData={customerGrowthData} />

            {/* Order Breakdown */}
            <OrderBreakdown orderBreakdownData={orderBreakdownData} />

            {/* Recent Orders */}
            <RecentOrders />
          </div>
        </div>
      </div>
    </>
  );
}
