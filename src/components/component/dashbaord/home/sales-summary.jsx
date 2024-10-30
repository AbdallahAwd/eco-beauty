import { Line } from "react-chartjs-2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SalesSummary({ salesData }) {
  return (
    <Card className="col-span-full lg:col-span-4">
      <CardHeader>
        <CardTitle>Sales Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily">
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="daily">
            <Line
              data={salesData}
              options={{ responsive: true, maintainAspectRatio: false }}
              height={300}
            />
          </TabsContent>
          <TabsContent value="weekly">
            <Line
              data={salesData}
              options={{ responsive: true, maintainAspectRatio: false }}
              height={300}
            />
          </TabsContent>
          <TabsContent value="monthly">
            <Line
              data={salesData}
              options={{ responsive: true, maintainAspectRatio: false }}
              height={300}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
