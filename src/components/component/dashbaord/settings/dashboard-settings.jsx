"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  CreditCard,
  Download,
  Globe,
  Lock,
  Plus,
  Settings,
  Upload,
  Users,
} from "lucide-react";

export function DashboardSettingsComponent() {
  const [activeTab, setActiveTab] = useState("general");

  const handleSaveChanges = () => {
    console.log("Saving changes...");
    // Implement save logic here
  };

  const handleCancelChanges = () => {
    console.log("Cancelling changes...");
    // Implement cancel logic here
  };

  return (
    <div className="p-8 mx-auto w-[75%]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard Settings</h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <div className="flex flex-col lg:flex-row gap-6">
            <Card className="w-full lg:w-64 mb-6 lg:mb-0">
              <CardHeader>
                <CardTitle>Settings Categories</CardTitle>
              </CardHeader>
              <CardContent className="mt-32">
                <TabsList className="flex flex-col w-full rounded-none items-start">
                  <TabsTrigger
                    value="general"
                    className="justify-start px-4 py-2 text-left"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    General
                  </TabsTrigger>
                  <TabsTrigger
                    value="appearance"
                    className="justify-start px-4 py-2 text-left"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Store Appearance
                  </TabsTrigger>
                  <TabsTrigger
                    value="users"
                    className="justify-start px-4 py-2 text-left"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    User Management
                  </TabsTrigger>
                  <TabsTrigger
                    value="integrations"
                    className="justify-start px-4 py-2 text-left"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Integrations
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="justify-start px-4 py-2 text-left"
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="justify-start px-4 py-2 text-left"
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Security
                  </TabsTrigger>
                  <TabsTrigger
                    value="billing"
                    className="justify-start px-4 py-2 text-left"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Billing
                  </TabsTrigger>
                  <TabsTrigger
                    value="backup"
                    className="justify-start px-4 py-2 text-left"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Backup & Export
                  </TabsTrigger>
                </TabsList>
              </CardContent>
            </Card>

            <div className="flex-1">
              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>
                      Manage your store&apos;s basic information and
                      preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="store-name">Store Name</Label>
                      <Input
                        id="store-name"
                        placeholder="Enter your store name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="store-email">Store Email</Label>
                      <Input
                        id="store-email"
                        type="email"
                        placeholder="contact@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="store-phone">Store Phone</Label>
                      <Input
                        id="store-phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Time Zone</Label>
                      <Select>
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select time zone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc">UTC</SelectItem>
                          <SelectItem value="est">Eastern Time</SelectItem>
                          <SelectItem value="pst">Pacific Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select>
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD</SelectItem>
                          <SelectItem value="eur">EUR</SelectItem>
                          <SelectItem value="gbp">GBP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appearance">
                <Card>
                  <CardHeader>
                    <CardTitle>Store Appearance</CardTitle>
                    <CardDescription>
                      Customize your store&apos;s visual elements.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="logo-upload">Store Logo</Label>
                      <Input id="logo-upload" type="file" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="favicon-upload">Favicon</Label>
                      <Input id="favicon-upload" type="file" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="color-scheme">Color Scheme</Label>
                      <Select>
                        <SelectTrigger id="color-scheme">
                          <SelectValue placeholder="Select color scheme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="font-style">Font Style</Label>
                      <Select>
                        <SelectTrigger id="font-style">
                          <SelectValue placeholder="Select font style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sans-serif">Sans-serif</SelectItem>
                          <SelectItem value="serif">Serif</SelectItem>
                          <SelectItem value="monospace">Monospace</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="custom-css">Custom CSS</Label>
                      <Textarea
                        id="custom-css"
                        placeholder="Enter custom CSS here"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>
                      Manage users and their permissions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">User List</h3>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" /> Add New User
                        </Button>
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Username</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Last Login</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>john.doe</TableCell>
                            <TableCell>Admin</TableCell>
                            <TableCell>2023-05-15 10:30 AM</TableCell>
                            <TableCell>
                              <Button variant="ghost">Edit</Button>
                              <Button variant="ghost" className="text-red-500">
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>jane.smith</TableCell>
                            <TableCell>Manager</TableCell>
                            <TableCell>2023-05-14 3:45 PM</TableCell>
                            <TableCell>
                              <Button variant="ghost">Edit</Button>
                              <Button variant="ghost" className="text-red-500">
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="integrations">
                <Card>
                  <CardHeader>
                    <CardTitle>Integrations</CardTitle>
                    <CardDescription>
                      Connect third-party services and tools.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Payment Gateways</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="stripe" />
                        <Label htmlFor="stripe">Stripe</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="paypal" />
                        <Label htmlFor="paypal">PayPal</Label>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label>Shipping Providers</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="fedex" />
                        <Label htmlFor="fedex">FedEx</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="ups" />
                        <Label htmlFor="ups">UPS</Label>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label>Social Media</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="facebook" />
                        <Label htmlFor="facebook">Facebook</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="instagram" />
                        <Label htmlFor="instagram">Instagram</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications & Alerts</CardTitle>
                    <CardDescription>
                      Manage your notification preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Order Notifications</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="new-order" />
                        <Label htmlFor="new-order">New Orders</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="canceled-order" />
                        <Label htmlFor="canceled-order">Canceled Orders</Label>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label>Inventory Alerts</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="low-stock" />
                        <Label htmlFor="low-stock">Low Stock Alerts</Label>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label>Performance Alerts</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="sales-summary" />
                        <Label htmlFor="sales-summary">
                          Daily Sales Summary
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="traffic-spike" />
                        <Label htmlFor="traffic-spike">
                          Traffic Spike Alerts
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security & Permissions</CardTitle>
                    <CardDescription>
                      Manage security settings and access controls.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Password Policy</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="complex-password" />
                        <Label htmlFor="complex-password">
                          Require Complex Passwords
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="password-expiry" />
                        <Label htmlFor="password-expiry">
                          Enable Password Expiry
                        </Label>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label>Two-Factor Authentication (2FA)</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="2fa-admin" />
                        <Label htmlFor="2fa-admin">
                          Require 2FA for Admins
                        </Label>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label>API Access</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="api-access" />
                        <Label htmlFor="api-access">Enable API Access</Label>
                      </div>
                      <Button variant="outline">Manage API Tokens</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing">
                <Card>
                  <CardHeader>
                    <CardTitle>Billing & Subscription</CardTitle>
                    <CardDescription>
                      Manage your subscription and billing information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Current Plan</Label>
                      <div className="font-semibold">Pro Plan</div>
                      <Button variant="outline">Upgrade Plan</Button>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label>Payment Method</Label>
                      <div>•••• •••• •••• 1234</div>
                      <Button variant="outline">Update Payment Method</Button>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label>Billing History</Label>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>2023-05-01</TableCell>
                            <TableCell>$49.99</TableCell>
                            <TableCell>Paid</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>2023-04-01</TableCell>
                            <TableCell>$49.99</TableCell>
                            <TableCell>Paid</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="backup">
                <Card>
                  <CardHeader>
                    <CardTitle>Backup & Data Export</CardTitle>
                    <CardDescription>
                      Manage your data backups and exports.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Data Backup</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="auto-backup" />
                        <Label htmlFor="auto-backup">
                          Enable Automatic Backups
                        </Label>
                      </div>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Backup Frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Manual Backup
                      </Button>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label>Data Export</Label>
                      <div className="space-y-2">
                        <Button variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Export Orders
                        </Button>
                        <Button variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Export Products
                        </Button>
                        <Button variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Export Customers
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label>Data Import</Label>
                      <Input id="import-file" type="file" />
                      <Button>
                        <Upload className="mr-2 h-4 w-4" />
                        Import Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        <Button variant="outline" onClick={handleCancelChanges}>
          Cancel
        </Button>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </div>
    </div>
  );
}
