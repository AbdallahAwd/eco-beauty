"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Ensure this is correctly imported
import { CreditCard } from "lucide-react";
import { Input } from "../ui/input";

// import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-base-50 text-base-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Company Info</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="hover:text-base-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-base-600 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/sustainability"
                  className="hover:text-base-600 transition-colors"
                >
                  Sustainability Practices
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-base-600 transition-colors"
                >
                  Contact Info
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-base-600 transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-returns"
                  className="hover:text-base-600 transition-colors"
                >
                  Shipping & Returns Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop/skincare"
                  className="hover:text-base-600 transition-colors"
                >
                  Skincare
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/haircare"
                  className="hover:text-base-600 transition-colors"
                >
                  Haircare
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/body"
                  className="hover:text-base-600 transition-colors"
                >
                  Body Care
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/makeup"
                  className="hover:text-base-600 transition-colors"
                >
                  Makeup
                </Link>
              </li>
              <li>
                <Link
                  href="/gift-cards"
                  className="hover:text-base-600 transition-colors"
                >
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-base-600 transition-colors"
              >
                {/* <Instagram className="h-6 w-6" /> */}
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-base-600 transition-colors"
              >
                {/* <Facebook className="h-6 w-6" /> */}
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-base-600 transition-colors"
              >
                {/* <Pinterest className="h-6 w-6" /> */}
                <span className="sr-only">Pinterest</span>
              </a>
            </div>
            <h4 className="font-semibold mb-2">Newsletter Signup</h4>
            <form className="flex gap-2">
              {/* Uncomment the Input field if it's needed and ensure it's imported correctly */}
              <Input
                type="email"
                placeholder="Your email"
                className="max-w-[200px]"
              />
              <Button type="submit" variant="outline">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-green-200">
          <div className="flex justify-center space-x-4 mb-4">
            {/* <CreditCard className="h-8 w-8" /> */}
            <CreditCard className="h-8 w-8" />
          </div>
          <p className="text-center text-sm text-base-600">
            © 2024 EcoBeauty. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
