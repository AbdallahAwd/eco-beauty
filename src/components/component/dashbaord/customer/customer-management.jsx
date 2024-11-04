"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Download, Printer, Calendar as CalendarIcon } from "lucide-react";
import { format, subMonths } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock data
const visitsBygovernorate = [
  { governorate: "MNF", visits: 10000, percentage: 35, conversionRate: 3.2 },
  { governorate: "Ciro", visits: 5000, percentage: 17.5, conversionRate: 2.8 },
  { governorate: "Alex", visits: 3000, percentage: 10.5, conversionRate: 3.0 },
  { governorate: "Giza", visits: 2000, percentage: 7, conversionRate: 2.5 },
  { governorate: "Sohag", visits: 1500, percentage: 5.25, conversionRate: 2.7 },
];

const visitorTypeData = [
  { name: "New Visitors", value: 4000 },
  { name: "Returning Visitors", value: 3000 },
];

const visitTrends = [
  { date: "2023-05-01", visits: 500 },
  { date: "2023-05-02", visits: 550 },
  { date: "2023-05-03", visits: 600 },
  { date: "2023-05-04", visits: 580 },
  { date: "2023-05-05", visits: 620 },
  { date: "2023-05-06", visits: 700 },
  { date: "2023-05-07", visits: 750 },
];

const customerList = [
  {
    id: 1,
    name: "John Doe",
    governorate: "USA",
    visits: 15,
    lastVisit: "2023-05-07",
    totalPurchases: 3,
  },
  {
    id: 2,
    name: "Jane Smith",
    governorate: "UK",
    visits: 8,
    lastVisit: "2023-05-06",
    totalPurchases: 2,
  },
  {
    id: 3,
    name: "Alice Johnson",
    governorate: "Canada",
    visits: 12,
    lastVisit: "2023-05-07",
    totalPurchases: 4,
  },
  {
    id: 4,
    name: "Bob Brown",
    governorate: "Australia",
    visits: 6,
    lastVisit: "2023-05-05",
    totalPurchases: 1,
  },
  {
    id: 5,
    name: "Emma Wilson",
    governorate: "Germany",
    visits: 10,
    lastVisit: "2023-05-07",
    totalPurchases: 3,
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

function DateRangePicker({ dateRange, setDateRange }) {
  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function CustomerManagementComponent() {
  const [dateRange, setDateRange] = useState({
    from: subMonths(new Date(), 1),
    to: new Date(),
  });
  const [governorateFilter, setgovernorateFilter] = useState("all");
  const [customerType, setCustomerType] = useState("all");

  const totalVisits = visitsBygovernorate.reduce(
    (sum, governorate) => sum + governorate.visits,
    0
  );
  const topgovernorate = visitsBygovernorate[0];
  const newVisitors = visitorTypeData[0].value;
  const returningVisitors = visitorTypeData[1].value;

  return (
    <div className="p-8 mx-auto w-[75%]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold">Customer Management</h1>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
          <Select
            value={governorateFilter}
            onValueChange={setgovernorateFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="governorate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Governorates</SelectItem>
              <SelectItem value="cairo">Cairo</SelectItem>
              <SelectItem value="giza">Giza</SelectItem>
              <SelectItem value="alexandria">Alexandria</SelectItem>
              <SelectItem value="aswan">Aswan</SelectItem>
              <SelectItem value="qalyubia"> Qalyubia</SelectItem>
              <SelectItem value="sohag"> Sohag</SelectItem>
              <SelectItem value="matrouh"> Matrouh</SelectItem>
              <SelectItem value="menofia"> Menofia</SelectItem>
            </SelectContent>
          </Select>
          <Select value={customerType} onValueChange={setCustomerType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Customer Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Customers</SelectItem>
              <SelectItem value="new">New Customers</SelectItem>
              <SelectItem value="returning">Returning Customers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalVisits.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Top governorate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {topgovernorate.governorate}
            </div>
            <p className="text-xs text-muted-foreground">
              {topgovernorate.percentage}% of total visits
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              New vs Returning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {newVisitors} / {returningVisitors}
            </div>
            <p className="text-xs text-muted-foreground">
              New / Returning visitors
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Visit Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3m 45s</div>
            <p className="text-xs text-muted-foreground">
              +30s from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Visits by governorate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={visitsBygovernorate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="governorate" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="visits" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>New vs Returning Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={visitorTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {visitorTypeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Visit Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={visitTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="search">Search Customers</Label>
            <Input id="search" placeholder="Search by name or governorate..." />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>governorate</TableHead>
                <TableHead>Visits</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Total Purchases</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerList.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.governorate}</TableCell>
                  <TableCell>{customer.visits}</TableCell>
                  <TableCell>{customer.lastVisit}</TableCell>
                  <TableCell>{customer.totalPurchases}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end mt-4 space-x-2">
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print Report
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
