"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ShoppingCart, Eye, Badge, Check, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";
// Sample product data
const products = [
  {
    id: 1,
    name: "Organic Rose Facial Serum",
    description: "Nourishing organic face serum for radiant skin",
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.8,
    reviews: 120,
    image: "/placeholder.svg",
    hoverImage: "/placeholder.svg",
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: 2,
    name: "Lavender Dream Night Cream",
    description: "Soothing night cream for rejuvenated skin",
    price: 39.99,
    rating: 4.6,
    reviews: 85,
    image: "/placeholder.svg",
    hoverImage: "/placeholder.svg",
    badge: "New",
    inStock: true,
  },
  {
    id: 3,
    name: "Citrus Burst Body Lotion",
    description: "Refreshing body lotion for all-day hydration",
    price: 29.99,
    rating: 4.7,
    reviews: 150,
    image: "/placeholder.svg",
    hoverImage: "/placeholder.svg",
    inStock: false,
  },
  {
    id: 4,
    name: "Green Tea Cleansing Gel",
    description: "Gentle cleansing gel for a fresh start",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.5,
    reviews: 95,
    image: "/placeholder.svg",
    hoverImage:
      "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    badge: "Limited Edition",
    inStock: true,
    discount: 10,
  },
];

export function FeaturedProducts({ category = "Featured Products" }) {
  return (
    <section className="py-12 bg-base-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">{category}</h2>
        {/* Scrollable product section for mobile */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none md:grid md:grid-cols-4 md:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="snap-start min-w-[80%] sm:min-w-[50%] md:min-w-[25%] flex-shrink-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
