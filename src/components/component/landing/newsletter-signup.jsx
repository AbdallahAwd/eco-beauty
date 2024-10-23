"use client";

import React from "react";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterSignup() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add newsletter signup logic here
    console.log("Newsletter signup submitted");
  };

  return (
    <section className="bg-base-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center space-x-4">
              <div className="bg-green-200 rounded-full p-3">
                <Mail className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Stay Connected
                </h2>
                <p className="text-gray-600">
                  Get 10% Off Your First Order! Sign up for exclusive offers.
                </p>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex-1 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow"
                required
              />
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold"
              >
                Subscribe Now
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
