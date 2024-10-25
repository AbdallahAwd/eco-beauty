"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CreditCard,
  Currency,
  CurrencyIcon,
  LucideBadgeDollarSign,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  TrashIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "../product/product";
import { products } from "@/lib/static/products";
import { useRouter } from "next/navigation";

// Mock data for cart items
const initialCartItems = [
  {
    id: 1,
    name: "Premium T-Shirt",
    price: 29.99,
    quantity: 2,
    image: "/placeholder.svg",
    variant: "Size: M, Color: Blue",
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 99.99,
    quantity: 1,
    image: "/placeholder.svg",
    variant: "Color: Black",
  },
];

export function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const router = useRouter();
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const freeShipping = 750;
  const shipping = subtotal > freeShipping ? 0 : 85;
  // const tax = subtotal * 0.08;
  // const total = subtotal + shipping + tax - discount;
  const total = subtotal + shipping + discount;

  const updateQuantity = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    // Simulate promo code application
    if (promoCode.toLowerCase() === "discount10") {
      setDiscount(subtotal * 0.1);
    } else {
      setDiscount(0);
    }
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
            <span className="text-gray-500">Cart</span>
          </li>
        </ol>
      </nav>
      {cartItems.length !== 0 && (
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      )}
      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCartIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <p className="text-xl text-gray-600 mb-4">Your cart is empty!</p>
          <Button asChild className="mx-auto bg-base-600 hover:bg-base-800">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {cartItems.map((item) => (
              <Card key={item.id} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md mr-4"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.variant}</p>
                      <p className="font-bold mt-1"> {item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        aria-label="Decrease quantity"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <span className="mx-2 w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        aria-label="Increase quantity"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="ml-4"
                      aria-label="Remove item"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <Card>
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span> {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : `${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span>Tax</span>
                    <span> {tax.toFixed(2)}</span>
                  </div> */}
                  {discount > 0 && (
                    <div className="flex justify-between text-base-600">
                      <span>Discount</span>
                      <span>- {discount.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span> {total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button onClick={applyPromoCode} className="bg-base-600">
                      Apply
                    </Button>
                  </div>
                </div>

                <Button
                  className="w-full mt-4 bg-base-600 hover:bg-base-800"
                  size="lg"
                  onClick={() => router.push("/cart/checkout")}
                >
                  Proceed to Checkout
                </Button>

                <div className="mt-4 text-center">
                  <Link href="/" className="text-base-600 hover:text-base-800">
                    Continue Shopping
                  </Link>
                </div>

                <div className="mt-4 flex justify-center space-x-2">
                  <CreditCard className="h-6 w-6" />
                  <Image
                    src="/images/instapay.png"
                    alt="PayPal"
                    width={40}
                    height={25}
                  />
                  <LucideBadgeDollarSign className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>

            {shipping > 0 && (
              <div className="mt-4 p-4 bg-blue-100 text-blue-800 rounded-md">
                Add {(freeShipping - subtotal).toFixed(2)} more to qualify for
                free shipping!
              </div>
            )}
          </div>
        </div>
      )}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">You May Also Like</h2>
        <div className="relative ">
          <div className="flex overflow-x-auto space-x-4 p-4 scrollbar-none">
            {products.map((product) => (
              <div key={product.id} className="flex-none w-64">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
