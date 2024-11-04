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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
// import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import {
  Search,
  Filter,
  MoreHorizontal,
  Printer,
  FileText,
  AlertTriangle,
} from "lucide-react";

// Mock data for orders
const orders = [
  {
    id: "#202345",
    customer: "Jane Doe",
    date: "2023-05-15",
    status: "Delivered",
    items: ["Organic Aloe Vera Cream", "Herbal Shampoo"],
    total: 79.98,
    shipping: "Standard",
    tracking: "US1234567890",
  },
  {
    id: "#202346",
    customer: "John Smith",
    date: "2023-05-16",
    status: "Processing",
    items: ["Vegan Lipstick", "Natural Sunscreen"],
    total: 54.99,
    shipping: "Express",
    tracking: "",
  },
  {
    id: "#202347",
    customer: "Emily Brown",
    date: "2023-05-17",
    status: "Pending",
    items: ["Organic Face Serum"],
    total: 39.99,
    shipping: "Standard",
    tracking: "",
  },
  {
    id: "#202348",
    customer: "Michael Johnson",
    date: "2023-05-18",
    status: "Shipped",
    items: ["Eco-friendly Body Lotion", "Organic Facial Toner"],
    total: 64.98,
    shipping: "Express",
    tracking: "US9876543210",
  },
  {
    id: "#202349",
    customer: "Sarah Wilson",
    date: "2023-05-19",
    status: "Canceled",
    items: ["Natural Deodorant"],
    total: 12.99,
    shipping: "Standard",
    tracking: "",
  },
];

const statusColors = {
  Delivered: "bg-green-500",
  Processing: "bg-yellow-500",
  Pending: "bg-red-500",
  Shipped: "bg-blue-500",
  Canceled: "bg-gray-500",
};

export default function OrdersAndShipping() {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });

  const filteredOrders = orders.filter(
    (order) =>
      (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "" || order.status === statusFilter) &&
      (!dateRange.from || new Date(order.date) >= dateRange.from) &&
      (!dateRange.to || new Date(order.date) <= dateRange.to)
  );

  const handleOrderSelect = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} for orders:`, selectedOrders);
    // Implement bulk action logic here
  };

  return (
    <div className="p-8 mx-auto w-full lg:w-[75%]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Orders & Shipping</h1>
        <div className="flex space-x-2">
          <Button onClick={() => handleBulkAction("process")}>
            Process Selected
          </Button>
          <Button onClick={() => handleBulkAction("print")}>
            Print Labels
          </Button>
          <Button onClick={() => handleBulkAction("export")}>
            Export Orders
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>{" "}
              {/* Use "all" instead of "" */}
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedOrders.length === filteredOrders.length}
                  onCheckedChange={(checked) => {
                    setSelectedOrders(
                      checked ? filteredOrders.map((o) => o.id) : []
                    );
                  }}
                />
              </TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Shipping</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedOrders.includes(order.id)}
                    onCheckedChange={() => handleOrderSelect(order.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge className={`${statusColors[order.status]} text-white`}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.items.join(", ")}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  {order.shipping}
                  {order.tracking && (
                    <span className="block text-xs text-gray-500">
                      Tracking: {order.tracking}
                    </span>
                  )}
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
                      <DropdownMenuItem
                        onClick={() => console.log("View details", order.id)}
                      >
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          console.log("Process shipping", order.id)
                        }
                      >
                        Process shipping
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => console.log("Print label", order.id)}
                      >
                        Print shipping label
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => console.log("Cancel order", order.id)}
                      >
                        Cancel order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Urgent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders
                .filter((o) => o.status === "Pending")
                .map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">
                        {order.id} - {order.customer}
                      </p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() =>
                        console.log("Process urgent order", order.id)
                      }
                    >
                      Process
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders
                .filter((o) => o.status === "Shipped" && !o.tracking)
                .map((order) => (
                  <div key={order.id} className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                    <div>
                      <p className="font-medium">
                        {order.id} - Missing Tracking
                      </p>
                      <p className="text-sm text-gray-500">
                        Shipped on {order.date}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
