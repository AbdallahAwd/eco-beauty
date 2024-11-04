import DashboardLayout from "@/components/component/dashbaord/dashboard-layout";
import OrdersAndShipping from "@/components/component/dashbaord/orders";
import { ProductManagementComponent } from "@/components/component/dashbaord/product/product-management";

export default function ProductMangement() {
  return (
    <DashboardLayout>
      <OrdersAndShipping />
    </DashboardLayout>
  );
}
