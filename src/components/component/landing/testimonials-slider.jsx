"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    id: 1,
    name: "Emily Johnson",
    image: "/placeholder.svg",
    rating: 5,
    quote:
      "These organic products have transformed my skincare routine. My skin has never looked better!",
  },
  {
    id: 2,
    name: "Michael Chen",
    image: "/placeholder.svg",
    rating: 4,
    quote:
      "I love how these products are not only effective but also environmentally friendly. Highly recommend!",
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    image: "/placeholder.svg",
    rating: 5,
    quote:
      "The natural fragrances are amazing, and I've noticed a significant improvement in my skin's texture.",
  },
  {
    id: 4,
    name: "David Thompson",
    image: "/placeholder.svg",
    rating: 4,
    quote:
      "Great products for sensitive skin. No more irritation, just healthy, glowing skin!",
  },
  {
    id: 5,
    name: "Olivia Parker",
    image: "/placeholder.svg",
    rating: 5,
    quote:
      "I'm impressed by the quality and effectiveness of these organic beauty products. A game-changer!",
  },
];

export function TestimonialsSlider() {
  return (
    <section className="py-16 bg-base-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Customers Say
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col items-center p-6">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="rounded-full mb-4"
                      />
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < testimonial.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <blockquote className="text-center italic mb-4">
                        {testimonial.quote}
                      </blockquote>
                      <p className="font-semibold">{testimonial.name}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
