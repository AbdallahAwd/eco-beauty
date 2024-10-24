"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LocateFixedIcon, Lock, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { egyptGovernorates } from "@/lib/static/info";

// Mock data for cart items
const cartItems = [
  {
    id: 1,
    name: "Premium T-Shirt",
    price: 29.99,
    quantity: 2,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 99.99,
    quantity: 1,
    image: "/placeholder.svg",
  },
];

// Mock data for shipping methods
const shippingMethods = [
  {
    id: "standard",
    name: "Standard Shipping",
    price: 5.99,
    estimatedDelivery: "3-5 business days",
  },
  {
    id: "express",
    name: "Express Shipping",
    price: 14.99,
    estimatedDelivery: "1-2 business days",
  },
];

export function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [billingIsSameAsShipping, setBillingIsSameAsShipping] = useState(true);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping =
    shippingMethods.find((method) => method.id === shippingMethod)?.price || 0;
  // const tax = subtotal * 0.08;
  // const total = subtotal + shipping + tax;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    // Simulate order placement
    console.log("Order placed!");
  };

  return (
    <div className="container min-h-screen mx-auto px-4 py-8 mt-10">
      <nav className="text-sm mb-4" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link href="/" className="text-base-600 hover:text-base-800">
              Home
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <Link href="/cart" className="text-base-600 hover:text-base-800">
              Cart
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <span className="text-gray-500">Checkout</span>
          </li>
        </ol>
      </nav>
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="shipping">
              <AccordionTrigger>Shipping Information</AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" placeholder="Ahmed..." />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="address1">Address Line 1</Label>
                        <Input id="address1" placeholder="123 Main St" />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="address2">Address Line 2</Label>
                        <Input id="address2" placeholder="Apt 4B" />
                      </div>
                      <div>
                        <Label htmlFor="governorate">Governorate</Label>
                        <Select>
                          <SelectTrigger id="governorate">
                            <SelectValue placeholder="Governorate" />
                          </SelectTrigger>
                          <SelectContent>
                            {egyptGovernorates.map((governorate) => (
                              <SelectItem value="us" key={governorate}>
                                {governorate}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input id="postalCode" placeholder="10001" />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="01011111111" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="saveAddress" />
                      <Label htmlFor="saveAddress">
                        Save this address for future purchases
                      </Label>
                    </div>
                    {/* <Button className="w-full md:w-[30%]  bg-base-600 hover:bg-base-800">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>Save</span>
                    </Button> */}
                  </CardContent>
                </Card>
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Delivery Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={shippingMethod}
                      onValueChange={setShippingMethod}
                    >
                      {shippingMethods.map((method) => (
                        <div
                          key={method.id}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem value={method.id} id={method.id} />
                          <Label htmlFor={method.id}>
                            {method.name} - ${method.price.toFixed(2)} (
                            {method.estimatedDelivery})
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="payment">
              <AccordionTrigger>Payment Method</AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardContent className="p-4">
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod">Cash on Delivery</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="instapay" id="instapay" />
                        <Label htmlFor="instapay">InstaPay</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card">Credit Card</Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === "cod" && (
                      <p className="mt-4 text-sm text-gray-600">
                        You will pay the total amount to the courier when your
                        order is delivered.
                      </p>
                    )}

                    {paymentMethod === "instapay" && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <Label htmlFor="instaPayAccount">
                            InstaPay Username
                          </Label>
                          <Input
                            id="instaPayAccount"
                            placeholder="Enter your InstaPay Username"
                          />
                        </div>
                        <Button>Confirm InstaPay Payment</Button>
                      </div>
                    )}

                    {paymentMethod === "credit-card" && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <Label htmlFor="cardholderName">
                            Cardholder Name
                          </Label>
                          <Input id="cardholderName" placeholder="John Doe" />
                        </div>
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expirationDate">
                              Expiration Date
                            </Label>
                            <Input id="expirationDate" placeholder="MM/YY" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="saveCard" />
                          <Label htmlFor="saveCard">
                            Save card for future purchases
                          </Label>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="mr-2 rounded"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                {/* <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div> */}
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 space-y-4">
            {/* <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">
                I agree to the terms and conditions of the purchase
              </Label>
            </div> */}
            <Button
              className="w-full bg-base-600 hover:bg-base-800"
              size="lg"
              onClick={handlePlaceOrder}
            >
              <Lock className="w-4 h-4 mr-2" />
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
