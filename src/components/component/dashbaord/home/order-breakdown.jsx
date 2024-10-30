import { Doughnut } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function OrderBreakdown({ orderBreakdownData }) {
  return (
    <Card className="col-span-full lg:col-span-3">
      <CardHeader>
        <CardTitle>Order Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <Doughnut
          data={orderBreakdownData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          }}
          height={250}
        />
      </CardContent>
    </Card>
  );
}
