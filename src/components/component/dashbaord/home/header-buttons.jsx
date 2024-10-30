import { Button } from "@/components/ui/button";
import { ClipboardList, PackageOpen, PlusCircle } from "lucide-react";

export default function HeaderButtons() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
        Dashboard Overview
      </h1>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Product
        </Button>
        <Button variant="outline">
          <ClipboardList className="mr-2 h-4 w-4" /> View Orders
        </Button>
        <Button variant="outline">
          <PackageOpen className="mr-2 h-4 w-4" /> Manage Inventory
        </Button>
      </div>
    </div>
  );
}
