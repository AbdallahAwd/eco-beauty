"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Filter, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { products } from "@/lib/static/products";

import { ProductCard } from "./component/landing/product";

export function CategoryPage() {
  const [sortBy, setSortBy] = useState("popularity");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [skinType, setSkinType] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    filterProducts();
  }, [sortBy, priceRange, skinType, certifications]);

  const filterProducts = () => {
    let filtered = [...products];

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by skin type
    if (skinType.length > 0) {
      filtered = filtered.filter(
        (product) =>
          skinType.includes(product.skinType) || product.skinType === "All"
      );
    }

    // Filter by certifications
    if (certifications.length > 0) {
      filtered = filtered.filter((product) =>
        certifications.every((cert) => product.certifications.includes(cert))
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sorting (popularity) is the original order
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleSkinTypeChange = (type) => {
    setSkinType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleCertificationChange = (cert) => {
    setCertifications((prev) =>
      prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert]
    );
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className=" min-h-screen bg-gray-50 ">
      {/* Promotional Banner */}
      <div className="bg-green-100 p-6 rounded-lg mt-16 text-center ">
        <h3 className="text-xl font-bold mb-2">
          Special Offer: Get 20% off all skincare bundles this week only!
        </h3>
        <Button variant="secondary">Shop Now</Button>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="hidden md:block w-full md:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="priceRange">Price Range</Label>
                    <Slider
                      id="priceRange"
                      min={0}
                      max={100}
                      step={1}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mt-2"
                    />
                    <div className="flex justify-between mt-2">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                  <div>
                    <Label>Skin Type</Label>
                    <div className="space-y-2 mt-2">
                      {["Dry", "Oily", "Combination", "Sensitive"].map(
                        (type) => (
                          <div key={type} className="flex items-center">
                            <Checkbox
                              id={`skin-${type.toLowerCase()}`}
                              checked={skinType.includes(type)}
                              onCheckedChange={() => handleSkinTypeChange(type)}
                            />
                            <Label
                              htmlFor={`skin-${type.toLowerCase()}`}
                              className="ml-2"
                            >
                              {type}
                            </Label>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div>
                    <Label>Certifications</Label>
                    <div className="space-y-2 mt-2">
                      {["Organic", "Cruelty-Free", "Vegan"].map((cert) => (
                        <div key={cert} className="flex items-center">
                          <Checkbox
                            id={`cert-${cert.toLowerCase()}`}
                            checked={certifications.includes(cert)}
                            onCheckedChange={() =>
                              handleCertificationChange(cert)
                            }
                          />
                          <Label
                            htmlFor={`cert-${cert.toLowerCase()}`}
                            className="ml-2"
                          >
                            {cert}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="w-full md:w-3/4">
            {/* Sorting and Mobile Filter */}
            <div className="flex justify-between items-center mb-6">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="price-low-high">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="price-high-low">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="rating">Customer Rating</SelectItem>
                </SelectContent>
              </Select>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden">
                    <Filter className="mr-2 h-4 w-4" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Refine your product search
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-4 space-y-4">
                    {/* Mobile filters content (same as sidebar) */}
                    <div>
                      <Label htmlFor="mobilePriceRange">Price Range</Label>
                      <Slider
                        id="mobilePriceRange"
                        min={0}
                        max={100}
                        step={1}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="mt-2"
                      />
                      <div className="flex justify-between mt-2">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                    <div>
                      <Label>Skin Type</Label>
                      <div className="space-y-2 mt-2">
                        {["Dry", "Oily", "Combination", "Sensitive"].map(
                          (type) => (
                            <div key={type} className="flex items-center">
                              <Checkbox
                                id={`mobile-skin-${type.toLowerCase()}`}
                                checked={skinType.includes(type)}
                                onCheckedChange={() =>
                                  handleSkinTypeChange(type)
                                }
                              />
                              <Label
                                htmlFor={`mobile-skin-${type.toLowerCase()}`}
                                className="ml-2"
                              >
                                {type}
                              </Label>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <Label>Certifications</Label>
                      <div className="space-y-2 mt-2">
                        {["Organic", "Cruelty-Free", "Vegan"].map((cert) => (
                          <div key={cert} className="flex items-center">
                            <Checkbox
                              id={`mobile-cert-${cert.toLowerCase()}`}
                              checked={certifications.includes(cert)}
                              onCheckedChange={() =>
                                handleCertificationChange(cert)
                              }
                            />
                            <Label
                              htmlFor={`mobile-cert-${cert.toLowerCase()}`}
                              className="ml-2"
                            >
                              {cert}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  {...fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
