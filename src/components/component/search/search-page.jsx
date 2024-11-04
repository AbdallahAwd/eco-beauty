"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { products } from "@/lib/static/products";

import { ProductCard } from "../product/product";

export function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State to handle the search term and filters
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [skinType, setSkinType] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Use useEffect to re-trigger filtering when search term, filters, or sorting change
  useEffect(() => {
    const query = searchParams.get("q") || "";
    setSearchTerm(query); // Ensure input field reflects the current query
    filterProducts(query);
  }, [searchParams, priceRange, sortBy, skinType, certifications]); // Add dependencies for filters

  // Filter products based on search term, filters, and sorting
  const filterProducts = (term = searchTerm) => {
    let filtered = [...products];

    // Filter by search term
    if (term) {
      const lowercaseTerm = term.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(lowercaseTerm) ||
          product.description.toLowerCase().includes(lowercaseTerm)
      );
    }

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
      case "relevance":
      default:
        // Simple relevance scoring example (prioritize name matches)
        filtered.sort((a, b) => {
          const aNameMatch = a.name.toLowerCase().includes(term.toLowerCase());
          const bNameMatch = b.name.toLowerCase().includes(term.toLowerCase());
          if (aNameMatch && !bNameMatch) return -1;
          if (!aNameMatch && bNameMatch) return 1;
          return 0;
        });
        break;
    }

    setFilteredProducts(filtered);
  };

  // Handle filter change for skin type and certifications
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
    <div className="min-h-screen  mt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Search Results</h1>

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
              <p className="text-sm text-gray-600">
                {filteredProducts.length} results for &quot;{searchTerm}&quot;
              </p>
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low-high">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high-low">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Customer Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No products found.</p>
                <p className="mt-2 text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
