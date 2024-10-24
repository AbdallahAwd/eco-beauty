"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, ShoppingCart, Eye, Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
    // Add to cart logic here
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // Add to wishlist logic here
  };

  return (
    <Card
      className="w-full relative overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-3">
        <div className="relative aspect-square mb-3 overflow-hidden rounded-lg">
          <Image
            src={isHovered ? product.hoverImage : product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
          {/* Mobile quick actions */}
          <div className="md:hidden absolute top-2 right-2 flex flex-col gap-2 z-5">
            <Button
              variant="secondary"
              size="icon"
              className="w-8 h-8 bg-white/80 backdrop-blur-sm"
              onClick={handleWishlist}
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  isWishlisted && "fill-current text-red-500"
                )}
              />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="w-8 h-8 bg-white/80 backdrop-blur-sm"
              onClick={handleAddToCart}
              disabled={!product.inStock || isAddedToCart}
            >
              {isAddedToCart ? (
                <Check className="h-4 w-4 text-base-600" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Desktop actions */}
          <div className="hidden md:block">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-white hover:text-red-500 z-10"
              onClick={handleWishlist}
            >
              <Heart
                className={cn(
                  "h-5 w-5",
                  isWishlisted && "fill-current text-red-500"
                )}
              />
            </Button>
          </div>

          {product.badge && (
            <Badge
              variant={
                product.badge === "best seller" ? "default" : "secondary"
              }
              className="absolute top-2 left-2 z-5"
            >
              {product.badge}
            </Badge>
          )}

          {/* Desktop hover overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hidden md:flex absolute inset-0 bg-black bg-opacity-40 items-center justify-center"
              >
                <Button variant="secondary" size="sm" className="mr-2">
                  <Eye className="w-4 h-4 mr-2" />
                  Quick View
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-3 h-3 md:w-4 md:h-4",
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs md:text-sm text-muted-foreground">
                ({product.reviews})
              </span>
            </div>
            {product.discount && (
              <Badge variant="outline" className="text-base-600 text-xs">
                {product.discount}% OFF
              </Badge>
            )}
          </div>

          <h3 className="font-medium md:font-bold text-base md:text-lg leading-tight line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="space-x-2">
              <span className="text-base md:text-lg font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs md:text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.freeDelivery && (
              <span className="text-xs md:text-sm text-muted-foreground">
                Free Delivery
              </span>
            )}
          </div>
        </div>

        {/* Desktop Add to Cart */}
        <div className="hidden md:block mt-4">
          <Button
            className="w-full bg-base-600 hover:bg-base-800"
            onClick={handleAddToCart}
            disabled={!product.inStock || isAddedToCart}
          >
            {isAddedToCart ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
