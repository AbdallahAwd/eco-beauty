"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, User, ShoppingCart, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockSuggestions = [
  "Organic Skincare",
  "Natural Haircare",
  "Vegan Makeup",
  "Eco-friendly Body Products",
  "Sustainable Beauty",
  "Cruelty-free Products",
  "Green Beauty",
];

export function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      setSuggestions(
        mockSuggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setShowSuggestions(false);
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300
        ${isScrolled ? "bg-white/75 backdrop-blur-lg shadow-md" : "bg-white"}`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
            <span className="text-xl font-bold text-green-800">EcoBeauty</span>
          </Link>
        </div>

        {/* Mobile Search Icon */}
        <div className="flex md:hidden items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>

        {/* Desktop Search Bar */}
        <div
          className="hidden md:flex-grow md:flex justify-center"
          ref={searchRef}
        >
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <ul
                className="absolute top-12 left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-50"
                role="listbox"
              >
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                    role="option"
                    aria-selected={false}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="hidden md:flex  items-center space-x-4">
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Wishlist</span>
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-base-500 text-xs text-white bg-base-600 flex items-center justify-center">
              3
            </span>
          </Button>
        </div>
      </div>

      {/* Mobile Search Input */}
      {isSearchOpen && (
        <div className="md:hidden bg-white w-full p-4 transition-all duration-300 ease-in-out">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => setIsSearchOpen(false)} // Close search when clicked
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close Search</span>
            </Button>

            {/* Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <ul
                className="absolute top-12 left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-50"
                role="listbox"
              >
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                    role="option"
                    aria-selected={false}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8 text-green-600"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}
