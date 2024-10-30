"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User, ShoppingCart, Heart, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const mockSuggestions = [
  "Organic Skincare",
  "Natural Haircare",
  "Vegan Makeup",
  "Eco-friendly Body Products",
  "Sustainable Beauty",
  "Cruelty-free Products",
  "Green Beauty",
];

const mockCartItems = [
  {
    id: 1,
    name: "Organic Face Cream",
    price: 24.99,
    image: "/placeholder.svg",
  },
  { id: 2, name: "Natural Shampoo", price: 15.99, image: "/placeholder.svg" },
  { id: 3, name: "Vegan Lipstick", price: 19.99, image: "/placeholder.svg" },
];

export function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItems] = useState(mockCartItems);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const searchRef = useRef(null);
  const mobileSearchInputRef = useRef(null);
  const router = useRouter();

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
      setSelectedSuggestionIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
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
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedSuggestionIndex((prevIndex) => Math.max(prevIndex - 1, -1));
    } else if (event.key === "Enter") {
      if (selectedSuggestionIndex >= 0) {
        handleSuggestionClick(suggestions[selectedSuggestionIndex]);
      } else {
        handleSearch();
      }
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 100);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [suggestions, selectedSuggestionIndex]);

  // Focus the mobile search input when search is opened
  const handleSearchIconClick = () => {
    setIsSearchOpen(true);
    setTimeout(() => {
      if (mobileSearchInputRef.current) {
        mobileSearchInputRef.current.focus();
      }
    }, 100); // Small delay to ensure the input is visible before focusing
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300
        ${isScrolled ? "bg-white/75 backdrop-blur-lg shadow-md" : "bg-white"}`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
            <span className="text-xl font-bold text-base-800">EcoBeauty</span>
          </Link>
        </div>

        {/* Mobile Search Icon */}
        <div className="flex md:hidden items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSearchIconClick} // Open search and focus input
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
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-base-600 focus:border-transparent"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={handleSearch}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <ul
                className="absolute top-12 left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-48 overflow-auto"
                role="listbox"
              >
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className={`px-4 py-2 hover:bg-gray-200 cursor-pointer ${
                      index === selectedSuggestionIndex ? "bg-gray-200" : ""
                    }`}
                    onMouseDown={() => handleSuggestionClick(suggestion)}
                    role="option"
                    aria-selected={index === selectedSuggestionIndex}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/account")}
          >
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/favorites")}
          >
            <Heart className="h-5 w-5" />
            <span className="sr-only">Wishlist</span>
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-base-500 text-xs text-white bg-base-600 flex items-center justify-center">
                  {cartItems.length}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <CartDropdown items={cartItems} />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Mobile Search Input */}
      {isSearchOpen && (
        <div className="md:hidden bg-white w-full p-4 transition-all duration-300 ease-in-out">
          <div className="relative">
            <input
              ref={mobileSearchInputRef} // Set the ref for mobile input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-base-600 focus:border-transparent"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => {
                setIsSearchOpen(false);
              }}
            >
              <XCircle className="h-5 w-5" />
              <span className="sr-only">Close Search</span>
            </Button>

            {/* Mobile Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <ul
                className="absolute top-12 left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-48 overflow-auto"
                role="listbox"
              >
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className={`px-4 py-2 hover:bg-gray-200 cursor-pointer ${
                      index === selectedSuggestionIndex ? "bg-gray-200" : ""
                    }`}
                    onMouseDown={() => handleSuggestionClick(suggestion)}
                    role="option"
                    aria-selected={index === selectedSuggestionIndex}
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
      className="h-8 w-8 text-base-600"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}

function CartDropdown({ items }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const router = useRouter();

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Your Cart</h3>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex items-center space-x-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="rounded"
                />
                <div className="flex-grow">
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">${item.price}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <Button
              className="w-full mt-4 bg-base-600 hover:bg-base-800"
              onClick={() => router.push("/cart")}
            >
              View Cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
