const products = [
  {
    id: 1,
    name: "Organic Rose Facial Serum",
    description: "Nourishing organic face serum for radiant skin",
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.8,
    discount: 10,
    reviews: 120,
    image: "/placeholder.svg",
    hoverImage: "/placeholder.svg",
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: 2,
    name: "Lavender Dream Night Cream",
    description: "Soothing night cream for rejuvenated skin",
    price: 39.99,
    rating: 4.6,
    reviews: 85,
    image: "/placeholder.svg",
    hoverImage: "/placeholder.svg",
    badge: "New",
    inStock: true,
  },
  {
    id: 3,
    name: "Citrus Burst Body Lotion",
    description: "Refreshing body lotion for all-day hydration",
    price: 29.99,
    rating: 4.7,
    reviews: 150,
    image: "/placeholder.svg",
    hoverImage: "/placeholder.svg",
    inStock: false,
  },
  {
    id: 4,
    name: "Green Tea Cleansing Gel",
    description: "Gentle cleansing gel for a fresh start",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.5,
    reviews: 95,
    image: "/placeholder.svg",
    hoverImage:
      "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    badge: "Limited Edition",
    inStock: true,
    discount: 10,
  },
];

const categories = [
  {
    name: "Skincare",
    image:
      "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    description: "Nourish your skin with organic, cruelty-free ingredients.",
    cta: "Shop Skincare",
    link: "/shop/skincare",
  },
  {
    name: "Haircare",
    image: "/placeholder.svg",
    description:
      "Enhance your hair's natural beauty with sulfate-free, organic products.",
    cta: "Shop Haircare",
    link: "/shop/haircare",
  },
  {
    name: "Body Care",
    image: "/placeholder.svg",
    description: "Pamper your body with all-natural body care essentials.",
    cta: "Shop Body Care",
    link: "/shop/body-care",
  },
  {
    name: "Makeup",
    image: "/placeholder.svg",
    description: "Discover vibrant, toxin-free makeup for a flawless finish.",
    cta: "Shop Makeup",
    link: "/shop/makeup",
  },
  {
    name: "Fragrances",
    image: "/placeholder.svg",
    description:
      "Embrace natural scents with our exclusive range of organic fragrances.",
    cta: "Shop Fragrances",
    link: "/shop/fragrances",
  },
  {
    name: "Wellness & Supplements",
    image: "/placeholder.svg",
    description: "Boost your inner beauty with our range of wellness products.",
    cta: "Shop Wellness",
    link: "/shop/wellness",
  },
];

export { products, categories };
