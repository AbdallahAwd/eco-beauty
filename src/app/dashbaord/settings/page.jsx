import DashboardLayout from "@/components/component/dashbaord/dashboard-layout";
import { DashboardSettingsComponent } from "@/components/component/dashbaord/settings/dashboard-settings";

export default function Customers() {
  return (
    <DashboardLayout>
      <DashboardSettingsComponent />
    </DashboardLayout>
  );
}
