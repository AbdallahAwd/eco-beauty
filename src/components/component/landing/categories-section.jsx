"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const categories = [
  {
    name: "Skincare",
    image:
      "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    description: "Nourish your skin with organic, cruelty-free ingredients.",
    cta: "Shop Skincare",
    link: "/shop/skincare",
  },
  {
    name: "Haircare",
    image: "/placeholder.svg",
    description:
      "Enhance your hair's natural beauty with sulfate-free, organic products.",
    cta: "Shop Haircare",
    link: "/shop/haircare",
  },
  {
    name: "Body Care",
    image: "/placeholder.svg",
    description: "Pamper your body with all-natural body care essentials.",
    cta: "Shop Body Care",
    link: "/shop/body-care",
  },
  {
    name: "Makeup",
    image: "/placeholder.svg",
    description: "Discover vibrant, toxin-free makeup for a flawless finish.",
    cta: "Shop Makeup",
    link: "/shop/makeup",
  },
  {
    name: "Fragrances",
    image: "/placeholder.svg",
    description:
      "Embrace natural scents with our exclusive range of organic fragrances.",
    cta: "Shop Fragrances",
    link: "/shop/fragrances",
  },
  {
    name: "Wellness & Supplements",
    image: "/placeholder.svg",
    description: "Boost your inner beauty with our range of wellness products.",
    cta: "Shop Wellness",
    link: "/shop/wellness",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-8 bg-base-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Explore Our Categories
        </h2>

        {/* Mobile Horizontal Scroll for categories */}
        <div className="flex gap-4 overflow-x-auto scrollbar-none md:grid md:grid-cols-3 md:gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ category }) {
  return (
    <motion.div
      className="flex-shrink-0 w-[75%] sm:w-[60%] md:w-auto rounded-lg  overflow-hidden shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-40 sm:h-48 md:h-64 ">
        <Image
          src={category.image}
          alt={category.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 hover:bg-opacity-50" />
        <div className="absolute inset-0 p-4 flex flex-col justify-end">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
            {category.name}
          </h3>
          <Link href={category.link}>
            <Button variant="secondary" className="mt-2 text-sm sm:text-base">
              {category.cta}
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
