import { AddNewProductComponent } from "@/components/component/dashbaord/product/add-new-product";
import DashboardLayout from "@/components/component/dashbaord/dashboard-layout";

export default function ProductMangement() {
  return (
    <DashboardLayout>
      <AddNewProductComponent />
    </DashboardLayout>
  );
}
