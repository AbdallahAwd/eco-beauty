import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit, MapPin, Phone, Plus, Trash2 } from "lucide-react";

export const renderAddresses = () => {
  const addresses = [
    {
      id: 1,
      type: "Home",
      address: "123 Main Street, Apt 4B",
      city: "New York",
      postalCode: "10001",
      phone: "+1 (555) 123-4567",
      isDefault: true,
    },
  ];
  return (
    <div className="space-y-6">
      {addresses.map((address) => (
        <Card key={address.id} className="overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">{address.type}</CardTitle>
                {address.isDefault && (
                  <Badge variant="secondary" className="text-xs">
                    Default
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                <div className="space-y-1">
                  <p className="leading-none">{address.address}</p>
                  <p className="text-sm text-muted-foreground">
                    {address.city}, {address.postalCode}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{address.phone}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between bg-muted/5 pt-4">
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
      <Button className=" bg-base-600">
        <Plus className="mr-2 h-4 w-4" />
        Add New Address
      </Button>
    </div>
  );
};
