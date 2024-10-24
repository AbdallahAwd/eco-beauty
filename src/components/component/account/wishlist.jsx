import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, Trash2 } from "lucide-react";
import Image from "next/image";

export function renderWishlist() {
  const wishlistItems = [
    {
      id: "1",
      name: "Organic Face Cream",
      price: 24.99,
      image: "/placeholder.svg",
      inStock: true,
    },
    {
      id: "2",
      name: "Natural Shampoo",
      price: 15.99,
      image: "/placeholder.svg",
      inStock: false,
    },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wishlistItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    ${item.price.toFixed(2)}
                  </p>
                  <Badge
                    variant={item.inStock ? "default" : "secondary"}
                    className="mt-1"
                  >
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" disabled={!item.inStock}>
                {item.inStock ? "Add to Cart" : "Notify Me"}
              </Button>
              <Button variant="ghost" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {wishlistItems.length === 0 && (
        <div className="text-center py-6">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-medium">Your wishlist is empty</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Save items you like to your wishlist
          </p>
        </div>
      )}
    </div>
  );
}
