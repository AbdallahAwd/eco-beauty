"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Check,
  Leaf,
  Droplet,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Reviews } from "./review";

// Mock product data
const product = {
  name: "Organic Rose Facial Serum",
  shortDescription:
    "100% organic ingredients, cruelty-free, and eco-friendly packaging",
  price: 49.99,
  originalPrice: 59.99,
  rating: 4.8,
  reviewCount: 134,
  inStock: true,
  images: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
  ],
  description:
    "Our Organic Rose Facial Serum is a luxurious blend of natural ingredients designed to nourish and revitalize your skin. Infused with the essence of organic roses, this serum helps to hydrate, smooth, and brighten your complexion, leaving you with a radiant, youthful glow.",
  ingredients:
    "Rosa Damascena Flower Water, Aloe Barbadensis Leaf Juice, Glycerin, Rosa Canina Fruit Oil, Tocopherol, Citrus Aurantium Dulcis Peel Oil, Lavandula Angustifolia Oil, Pelargonium Graveolens Oil, Citronellol, Geraniol, Linalool",
  benefits: [
    "Deeply hydrates and nourishes the skin",
    "Reduces the appearance of fine lines and wrinkles",
    "Improves skin elasticity and firmness",
    "Balances skin tone and texture",
    "Protects against environmental stressors",
  ],
  howToUse:
    "Apply 2-3 drops to clean, damp skin morning and night. Gently pat into face and neck, avoiding the eye area. Follow with your favorite moisturizer.",
  reviews: [
    {
      id: 1,
      author: "Emily S.",
      rating: 5,
      text: "This serum is amazing! My skin feels so soft and hydrated.",
    },
    {
      id: 2,
      author: "Michael T.",
      rating: 4,
      text: "Great product, but I wish the scent was a bit stronger.",
    },
    {
      id: 3,
      author: "Sarah L.",
      rating: 5,
      text: "I've been using this for a month and my skin looks noticeably brighter!",
    },
  ],
};

// Mock related products data
const relatedProducts = [
  {
    id: 1,
    name: "Organic Lavender Night Cream",
    price: 39.99,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Natural Vitamin C Serum",
    price: 54.99,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Eco-Friendly Bamboo Face Brush",
    price: 14.99,
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Organic Green Tea Toner",
    price: 29.99,
    image: "/placeholder.svg",
  },
];

export function ProductPage() {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={mainImage}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="transition-all duration-300 hover:scale-105"
            />
          </div>
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {product.images.map((image, index) => (
                <CarouselItem key={index} className="basis-1/3">
                  <div className="p-1">
                    <Image
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      width={100}
                      height={100}
                      className="rounded-md cursor-pointer"
                      onClick={() => setMainImage(image)}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600">{product.shortDescription}</p>
          </div>

          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-gray-600">
              ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-green-600">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {product.inStock ? (
            <Badge
              variant="outline"
              className="text-green-600 border-green-600"
            >
              In Stock
            </Badge>
          ) : (
            <Badge variant="outline" className="text-red-600 border-red-600">
              Out of Stock
            </Badge>
          )}

          <div className="flex items-center space-x-4">
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20"
            />
            <Button className="flex-1 bg-base-600" size="lg">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart
                className={`w-5 h-5 ${
                  isWishlisted ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>
          </div>

          <div className="flex space-x-2">
            <Badge variant="secondary">
              <Leaf className="w-4 h-4 mr-1" />
              Organic
            </Badge>
            <Badge variant="secondary">
              <Droplet className="w-4 h-4 mr-1" />
              Cruelty-Free
            </Badge>
            <Badge variant="secondary">
              <Zap className="w-4 h-4 mr-1" />
              Eco-Friendly
            </Badge>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Share:</span>
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </div>
      {/* Product Tabs */}
      <Tabs defaultValue="description" className="mt-12">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="how-to-use">How to Use</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Product Description</h3>
          <p>{product.description}</p>
          <h4 className="text-lg font-semibold mt-4 mb-2">Benefits</h4>
          <ul className="list-disc pl-5 space-y-1">
            {product.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="ingredients" className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
          <p>{product.ingredients}</p>
        </TabsContent>
        <TabsContent value="how-to-use" className="mt-4">
          <h3 className="text-xl font-semibold mb-2">How to Use</h3>
          <p>{product.howToUse}</p>
        </TabsContent>
        <TabsContent value="reviews" className="mt-4">
          <Reviews reviews={product.reviews} />
        </TabsContent>
      </Tabs>
      {/* Related Products */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
        <Carousel className="w-full">
          <CarouselContent>
            {relatedProducts.map((relatedProduct) => (
              <CarouselItem
                key={relatedProduct.id}
                className="md:basis-1/2 lg:basis-1/4"
              >
                <div className="p-1">
                  <Image
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    width={300}
                    height={300}
                    className="rounded-lg mb-2"
                  />
                  <h3 className="font-semibold">{relatedProduct.name}</h3>
                  <p className="text-green-600">
                    ${relatedProduct.price.toFixed(2)}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      {/* Trust Badges */}
      <section className="mt-12 flex justify-center space-x-8">
        <Badge variant="outline" className="p-2">
          <Check className="w-5 h-5 mr-2" />
          Secure Checkout
        </Badge>
        <Badge variant="outline" className="p-2">
          <Check className="w-5 h-5 mr-2" />
          Free Shipping Over $50
        </Badge>
        <Badge variant="outline" className="p-2">
          <Check className="w-5 h-5 mr-2" />
          30-Day Guarantee
        </Badge>
      </section>
    </div>
  );
}
