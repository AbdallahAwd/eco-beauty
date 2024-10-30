import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentOrders() {
  return (
    <Card className="col-span-full lg:col-span-3">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((order) => (
            <div key={order} className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Order #{order}00{order}
                </p>
                <p className="text-sm text-muted-foreground">
                  Customer: John Doe
                </p>
              </div>
              <div className="ml-auto font-medium">$89.99</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
