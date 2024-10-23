"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, ShoppingCart, Eye, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);
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
      className="w-full max-w-sm relative overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
          <Image
            src={isHovered ? product.hoverImage : product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
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
          {product.badge && (
            <Badge
              variant={
                product.badge === "best seller" ? "default" : "secondary"
              }
              className="absolute top-2 left-2 z-10"
            >
              {product.badge}
            </Badge>
          )}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
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
          <div className="flex items-center">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-4 h-4",
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviews})
            </span>
          </div>
          <h3 className="font-bold text-lg leading-tight">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="space-x-2">
              <span className="text-lg font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.discount && (
              <Badge variant="outline" className="text-green-600">
                {product.discount}% OFF
              </Badge>
            )}
          </div>
          {product.freeDelivery && (
            <p className="text-sm text-muted-foreground">Free Delivery</p>
          )}
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <select
              id={`quantity-${product.id}`}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="block w-20 rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <Button
              className="w-full ml-2 bg-base-600 hover:bg-base-800"
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
        </div>
      </CardContent>
    </Card>
  );
}
