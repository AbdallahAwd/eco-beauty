"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { categories } from "@/lib/static/products";

export function CategoryGrid() {
  return (
    <div className="w-full px-4 py-8 md:py-16 mt-10 ">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">
          Explore Our Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                    {category.name}
                  </h3>
                  <Link
                    href={category.link}
                    className="hidden  md:inline-flex items-center justify-center w-fit px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-gray-100"
                  >
                    {category.cta}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryGrid;
