import { CustomerManagementComponent } from "@/components/component/dashbaord/customer/customer-management";
import DashboardLayout from "@/components/component/dashbaord/dashboard-layout";

export default function Customers() {
  return (
    <DashboardLayout>
      <CustomerManagementComponent />
    </DashboardLayout>
  );
}
