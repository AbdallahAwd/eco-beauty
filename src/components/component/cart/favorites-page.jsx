"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Trash2,
  Filter,
  ShoppingBag,
  ShoppingBasket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Mock data for favorite products
const initialFavorites = [
  {
    id: 1,
    name: "Organic Face Cream",
    price: 24.99,
    image: "/placeholder.svg",
    inStock: true,
  },
  {
    id: 2,
    name: "Natural Shampoo",
    price: 15.99,
    image: "/placeholder.svg",
    inStock: true,
  },
  {
    id: 3,
    name: "Vegan Lipstick",
    price: 19.99,
    image: "/placeholder.svg",
    inStock: false,
  },
  {
    id: 4,
    name: "Eco-friendly Body Lotion",
    price: 22.99,
    image: "/placeholder.svg",
    inStock: true,
  },
];

// Mock data for related products
const relatedProducts = [
  { id: 5, name: "Organic Eye Cream", price: 29.99, image: "/placeholder.svg" },
  {
    id: 6,
    name: "Natural Conditioner",
    price: 17.99,
    image: "/placeholder.svg",
  },
  { id: 7, name: "Vegan Mascara", price: 21.99, image: "/placeholder.svg" },
];

export function FavoritesPage() {
  const [favorites, setFavorites] = useState(initialFavorites);
  const [sortBy, setSortBy] = useState("default");

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  const addToCart = (id) => {
    console.log(`Added product ${id} to cart`);
  };

  const sortFavorites = (method) => {
    let sortedFavorites = [...favorites];
    switch (method) {
      case "price-low-high":
        sortedFavorites.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        sortedFavorites.sort((a, b) => b.price - a.price);
        break;
      case "name":
        sortedFavorites.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    setFavorites(sortedFavorites);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <nav className="text-sm mb-4" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link href="/" className="text-base-600 hover:text-base-800">
              Home
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <span className="text-gray-500">Favorites</span>
          </li>
        </ol>
      </nav>
      <h1 className="text-3xl font-bold mb-4">Your Favorites</h1>
      <p className="text-gray-600 mb-8">
        You have {favorites.length} items in your favorites
      </p>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <Select
              onValueChange={(value) => {
                setSortBy(value);
                sortFavorites(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-low-high">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="price-high-low">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter by Category</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="skincare-mobile" />
                      <label
                        htmlFor="skincare-mobile"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Skincare
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="makeup-mobile" />
                      <label
                        htmlFor="makeup-mobile"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Makeup
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="haircare-mobile" />
                      <label
                        htmlFor="haircare-mobile"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Haircare
                      </label>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="space-y-4">
            {favorites.map((product) => (
              <Card key={product.id} className="flex items-center p-4">
                <div className="flex-shrink-0 mr-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600">${product.price.toFixed(2)}</p>
                  <p
                    className={`text-sm ${
                      product.inStock ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addToCart(product.id)}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.inStock ? "Add" : "Notify"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFavorite(product.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {favorites.length === 0 && (
            <div className="flex flex-col items-center text-center py-12 ">
              <ShoppingCart className="h-52 w-52 text-gray-300 " />
              <p className="text-xl text-gray-600 my-4">
                Your favorites list is empty!
              </p>
              <Button asChild className="bg-base-600">
                <Link href="/">Continue Shopping</Link>
              </Button>
            </div>
          )}

          {favorites.length !== 0 && (
            <div className="mt-6">
              <Button
                className="w-full bg-base-600"
                onClick={() => console.log("Add all to cart")}
              >
                Add All to Cart
              </Button>
            </div>
          )}
        </div>

        <div className="hidden md:block md:w-1/4">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Filter by Category</h2>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="skincare" />
                  <label
                    htmlFor="skincare"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Skincare
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="makeup" />
                  <label
                    htmlFor="makeup"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Makeup
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="haircare" />
                  <label
                    htmlFor="haircare"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Haircare
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {relatedProducts.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-600">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
