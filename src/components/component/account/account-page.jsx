"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Edit,
  Heart,
  Lock,
  LogOut,
  MapPin,
  Package,
  Plus,
  Settings,
  Trash2,
  User,
} from "lucide-react";
import { renderProfile } from "./profile";
import { renderOrders } from "./orders";
import { renderAddresses } from "./addresses";
import { renderSettings } from "./settings";
import { renderWishlist } from "./wishlist";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg",
  };

  return (
    <div className="container min-h-screen mx-auto px-4 py-8 mt-14">
      <div className="flex flex-col md:flex-row md:space-x-6">
        {/* Mobile Header */}
        <div className="md:hidden mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <h1 className="text-xl font-semibold">
                      Hello, {user.name}!
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="bg-base-50">
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:block md:w-1/4">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <nav className="flex flex-col space-y-1">
                <Button
                  variant={activeTab === "profile" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button
                  variant={activeTab === "orders" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("orders")}
                >
                  <Package className="mr-2 h-4 w-4" />
                  Orders
                </Button>
                <Button
                  variant={activeTab === "addresses" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("addresses")}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Addresses
                </Button>

                <Button
                  variant={activeTab === "settings" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Button>
                <Button
                  variant={activeTab === "wishlist" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("wishlist")}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </Button>
              </nav>
            </CardContent>
            <CardFooter>
              <Button
                // variant="destructive"
                className="w-full text-black bg-white hover:bg-white/80 border-2 border-base-200 hover:border-base-600 hover:text-base-600"
              >
                <LogOut className="mr-2 h-4 w-4  " />
                Log Out
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Mobile Accordion */}
        <Accordion type="single" collapsible className="w-full md:hidden">
          <AccordionItem value="profile">
            <AccordionTrigger>
              <User className="mr-2 h-4 w-4" />
              Profile
            </AccordionTrigger>
            <AccordionContent>{renderProfile()}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="orders">
            <AccordionTrigger>
              <Package className="mr-2 h-4 w-4" />
              Orders
            </AccordionTrigger>
            <AccordionContent>{renderOrders()}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="addresses">
            <AccordionTrigger>
              <MapPin className="mr-2 h-4 w-4" />
              Addresses
            </AccordionTrigger>
            <AccordionContent>{renderAddresses()}</AccordionContent>
          </AccordionItem>

          <AccordionItem value="settings">
            <AccordionTrigger>
              <Settings className="mr-2 h-4 w-4" />
              Account Settings
            </AccordionTrigger>
            <AccordionContent>{renderSettings()}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="wishlist">
            <AccordionTrigger>
              <Heart className="mr-2 h-4 w-4" />
              Wishlist
            </AccordionTrigger>
            <AccordionContent>{renderWishlist()}</AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Desktop Content */}
        <div className="hidden md:block md:w-3/4">
          <Card>
            <CardHeader>
              <CardTitle>{getActiveTabTitle()}</CardTitle>
            </CardHeader>
            <CardContent>{renderActiveTab()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  function getActiveTabTitle() {
    const titles = {
      profile: "Profile",
      orders: "Orders",
      addresses: "Addresses",
      payment: "Payment Methods",
      settings: "Account Settings",
      wishlist: "Wishlist",
    };
    return titles[activeTab] || "Profile";
  }

  function renderActiveTab() {
    const tabs = {
      profile: renderProfile,
      orders: renderOrders,
      addresses: renderAddresses,
      settings: renderSettings,
      wishlist: renderWishlist,
    };
    return (tabs[activeTab] || renderProfile)();
  }
};

export default AccountPage;
