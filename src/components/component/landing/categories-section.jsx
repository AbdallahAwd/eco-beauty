"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/static/products";

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
