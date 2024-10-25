"use client";

import React, { useState } from "react";

import { products } from "@/lib/static/products";
import { ProductCard } from "../product/product";
// Sample product data

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
