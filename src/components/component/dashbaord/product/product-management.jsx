"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Edit,
  Trash2,
  Copy,
  Eye,
  MoreHorizontal,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

// Mock data for products
const products = [
  {
    id: 1,
    name: "Organic Face Cream",
    category: "Skincare",
    price: 29.99,
    salePrice: null,
    stock: 50,
    status: "active",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Natural Shampoo",
    category: "Haircare",
    price: 14.99,
    salePrice: 12.99,
    stock: 100,
    status: "active",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Vegan Lipstick",
    category: "Makeup",
    price: 19.99,
    salePrice: null,
    stock: 5,
    status: "active",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Eco-friendly Moisturizer",
    category: "Skincare",
    price: 24.99,
    salePrice: null,
    stock: 0,
    status: "inactive",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Organic Sunscreen",
    category: "Skincare",
    price: 21.99,
    salePrice: 18.99,
    stock: 75,
    status: "active",
    image: "/placeholder.svg",
  },
];

export function ProductManagementComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "all" || product.category === categoryFilter) &&
      (statusFilter === "all" || product.status === statusFilter)
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low-high") return a.price - b.price;
    if (sortBy === "price-high-low") return b.price - a.price;
    if (sortBy === "name-a-z") return a.name.localeCompare(b.name);
    if (sortBy === "name-z-a") return b.name.localeCompare(a.name);
    return 0;
  });

  const getStockStatus = (stock) => {
    if (stock > 20) return { color: "bg-green-500", text: "In Stock" };
    if (stock > 0) return { color: "bg-yellow-500", text: "Low Stock" };
    return { color: "bg-red-500", text: "Out of Stock" };
  };

  return (
    <div className="p-8 mx-auto  w-full md:w-[75%]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />{" "}
          <Link href="/dashbaord/products/add">Add New Product</Link>
        </Button>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Skincare">Skincare</SelectItem>
              <SelectItem value="Haircare">Haircare</SelectItem>
              <SelectItem value="Makeup">Makeup</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-low-high">Price: Low to High</SelectItem>
              <SelectItem value="price-high-low">Price: High to Low</SelectItem>
              <SelectItem value="name-a-z">Name: A to Z</SelectItem>
              <SelectItem value="name-z-a">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Bulk Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Button variant="outline">Bulk Edit</Button>
            <Button variant="outline">Bulk Activate</Button>
            <Button variant="outline">Bulk Deactivate</Button>
            <Button variant="outline">Bulk Delete</Button>
            <Button variant="outline">Export Selected</Button>
          </div>
        </CardContent>
      </Card>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock Status</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  {product.salePrice ? (
                    <div>
                      <span className="line-through text-gray-500">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="ml-2 text-green-600">
                        ${product.salePrice.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span>${product.price.toFixed(2)}</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Badge
                      variant="outline"
                      className={`${getStockStatus(product.stock).color} mr-2`}
                    >
                      {getStockStatus(product.stock).text}
                    </Badge>
                    <span>{product.stock} left</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={product.status === "active"}
                    onCheckedChange={() => {
                      // Toggle product status logic here
                    }}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" /> Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Low Stock Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products
              .filter((p) => p.stock <= 20)
              .map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                    <span>
                      {product.name} - {product.stock} left in stock
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    Restock
                  </Button>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
