"use client";
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon, X } from "lucide-react"

export function AddNewProductComponent() {
  const { register, handleSubmit, control, watch } = useForm()
  const [images, setImages] = useState([])

  const onSubmit = (data) => {
    console.log(data)
    // Here you would typically send the data to your backend
  }

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    setImages(
      prevImages => [...prevImages, ...files.map(file => URL.createObjectURL(file))]
    )
  }

  const removeImage = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index))
  }

  return (
    (<div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Add New Product</h1>
        <div>
          <Button variant="outline" className="mr-2">Save Draft</Button>
          <Button variant="outline" className="mr-2">Preview</Button>
          <Button onClick={handleSubmit(onSubmit)}>Save & Publish</Button>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs defaultValue="basic-info">
          <TabsList className="mb-4">
            <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients & Certifications</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="pricing">Pricing & Inventory</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="seo">SEO & Visibility</TabsTrigger>
          </TabsList>

          <TabsContent value="basic-info">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="productName">Product Name</Label>
                  <Input
                    id="productName"
                    {...register("productName", { required: true })}
                    placeholder="e.g. Organic Aloe Vera Face Cream" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="skincare">Skincare</SelectItem>
                          <SelectItem value="haircare">Haircare</SelectItem>
                          <SelectItem value="bodycare">Body Care</SelectItem>
                          <SelectItem value="makeup">Makeup</SelectItem>
                        </SelectContent>
                      </Select>
                    )} />
                </div>
                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    {...register("sku")}
                    placeholder="Enter SKU or leave blank to auto-generate" />
                </div>
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input id="brand" {...register("brand")} placeholder="Enter brand name" />
                </div>
                <div>
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Textarea
                    id="shortDescription"
                    {...register("shortDescription")}
                    placeholder="Brief summary of the product" />
                </div>
                <div>
                  <Label htmlFor="longDescription">Long Description</Label>
                  <Textarea
                    id="longDescription"
                    {...register("longDescription")}
                    placeholder="Detailed description including benefits and usage instructions" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ingredients">
            <Card>
              <CardHeader>
                <CardTitle>Ingredients & Certifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="ingredients">Ingredients List</Label>
                  <Textarea
                    id="ingredients"
                    {...register("ingredients")}
                    placeholder="List all ingredients" />
                </div>
                <div>
                  <Label>Certifications</Label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {['Organic', 'Vegan', 'Cruelty-Free', 'Gluten-Free', 'Paraben-Free'].map((cert) => (
                      <div key={cert} className="flex items-center space-x-2">
                        <Checkbox id={cert} {...register(cert)} />
                        <label
                          htmlFor={cert}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{cert}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="sustainability">Sustainability Information</Label>
                  <Textarea
                    id="sustainability"
                    {...register("sustainability")}
                    placeholder="Enter details about eco-friendly packaging or sustainability efforts" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images">
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>Upload images of your product. Recommended size: 800x800px, Format: JPEG or PNG</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input type="file" multiple onChange={handleImageUpload} accept="image/*" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-40 object-cover rounded" />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => removeImage(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing">
            <Card>
              <CardHeader>
                <CardTitle>Pricing & Inventory</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="regularPrice">Regular Price</Label>
                  <Input
                    id="regularPrice"
                    type="number"
                    step="0.01"
                    {...register("regularPrice", { required: true })}
                    placeholder="0.00" />
                </div>
                <div>
                  <Label htmlFor="salePrice">Sale Price (Optional)</Label>
                  <Input
                    id="salePrice"
                    type="number"
                    step="0.01"
                    {...register("salePrice")}
                    placeholder="0.00" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="manageStock" {...register("manageStock")} />
                  <Label htmlFor="manageStock">Manage Stock</Label>
                </div>
                <div>
                  <Label htmlFor="stockQuantity">Stock Quantity</Label>
                  <Input
                    id="stockQuantity"
                    type="number"
                    {...register("stockQuantity")}
                    placeholder="Enter stock quantity" />
                </div>
                <div>
                  <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                  <Input
                    id="lowStockThreshold"
                    type="number"
                    {...register("lowStockThreshold")}
                    placeholder="Enter low stock threshold" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipping">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.01"
                    {...register("weight")}
                    placeholder="Enter product weight" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="length">Length (cm)</Label>
                    <Input
                      id="length"
                      type="number"
                      step="0.1"
                      {...register("length")}
                      placeholder="Length" />
                  </div>
                  <div>
                    <Label htmlFor="width">Width (cm)</Label>
                    <Input
                      id="width"
                      type="number"
                      step="0.1"
                      {...register("width")}
                      placeholder="Width" />
                  </div>
                  <div>
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      step="0.1"
                      {...register("height")}
                      placeholder="Height" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="shippingClass">Shipping Class</Label>
                  <Controller
                    name="shippingClass"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a shipping class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard Shipping</SelectItem>
                          <SelectItem value="express">Express Shipping</SelectItem>
                          <SelectItem value="free">Free Shipping</SelectItem>
                        </SelectContent>
                      </Select>
                    )} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <CardTitle>SEO & Visibility</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="seoTitle">SEO Title</Label>
                  <Input id="seoTitle" {...register("seoTitle")} placeholder="Enter SEO title" />
                </div>
                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    {...register("metaDescription")}
                    placeholder="Enter meta description" />
                </div>
                <div>
                  <Label htmlFor="productUrl">Product URL</Label>
                  <Input
                    id="productUrl"
                    {...register("productUrl")}
                    placeholder="Enter product URL slug" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="isActive" {...register("isActive")} />
                  <Label htmlFor="isActive">Product Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="isFeatured" {...register("isFeatured")} />
                  <Label htmlFor="isFeatured">Featured Product</Label>
                </div>
                <div>
                  <Label>Publish Date</Label>
                  <Controller
                    name="publishDate"
                    control={control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline">
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus />
                        </PopoverContent>
                      </Popover>
                    )} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>)
  );
}