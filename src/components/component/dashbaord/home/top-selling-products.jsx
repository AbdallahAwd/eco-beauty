import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar } from "react-chartjs-2";

export function TopSellingProducts({ topProductsData }) {
  return (
    <Card className="col-span-full lg:col-span-3">
      <CardHeader>
        <CardTitle>Top-Selling Products</CardTitle>
      </CardHeader>
      <CardContent>
        <Bar
          data={topProductsData}
          options={{
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Units Sold",
                },
              },
              y: {
                ticks: {
                  autoSkip: false,
                  maxRotation: 0,
                  minRotation: 0,
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
