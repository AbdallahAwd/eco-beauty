"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    image: "/placeholder.svg",
    alt: "Model using skincare products in a garden",
    tagline: "Glow Naturally with Pure Organic Ingredients",
    cta: "Shop Skincare",
    offer: "Free shipping on orders over $50!",
  },
  {
    image: "/placeholder.svg",
    alt: "Organic beauty products in a minimalist bathroom",
    tagline: "Sustainable Beauty for a Better Tomorrow",
    cta: "Explore Our Collection",
    offer: "20% off your first order",
  },
  {
    image: "/placeholder.svg",
    alt: "Eco-friendly packaging with green background",
    tagline: "Nourish Your Skin with 100% Organic Products",
    cta: "Learn More",
    offer: "Join our loyalty program for more offers",
  },
  {
    image: "/placeholder.svg",
    alt: "Autumn-themed product display",
    tagline: "Fall in Love with Clean Beauty This Season",
    cta: "Shop Seasonal Offers",
    offer: "Limited-time deals available",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;

    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
    setIsAutoPlaying(false);
  };

  return (
    <div
      className="relative h-[600px] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 max-w-3xl">
              {slide.tagline}
            </h2>
            <Button
              size="lg"
              className="mb-4 bg-base-600 hover:bg-green-700 text-white"
            >
              {slide.cta}
            </Button>
            <p className="text-lg md:text-xl text-center">{slide.offer}</p>
          </div>
        </div>
      ))}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous slide</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next slide</span>
      </Button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
            }`}
            onClick={() => goToSlide(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
