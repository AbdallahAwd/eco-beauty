import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line } from "react-chartjs-2";

export function CustomerGrowth({ customerGrowthData }) {
  return (
    <Card className="col-span-full lg:col-span-4">
      <CardHeader>
        <CardTitle>Customer Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <Line
          data={customerGrowthData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Number of Customers",
                },
              },
            },
          }}
          height={300}
        />
      </CardContent>
    </Card>
  );
}
