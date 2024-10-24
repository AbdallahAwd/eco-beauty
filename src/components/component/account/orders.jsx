const { Button } = require("@/components/ui/button");
const {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} = require("@/components/ui/card");
const { Progress } = require("@radix-ui/react-progress");
const { Badge } = require("lucide-react");

export function renderOrders() {
  const orders = [
    {
      id: "1234",
      date: "2023-05-15",
      status: "Delivered",
      total: 99.99,
      items: 3,
    },
    {
      id: "5678",
      date: "2023-06-01",
      status: "Processing",
      total: 149.99,
      items: 2,
      progress: 50,
    },
  ];
  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader>
            <CardTitle className="text-lg">Order #{order.id}</CardTitle>
            <CardDescription>Placed on {order.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="flex ">
                  Status:
                  <div
                    className={`ml-2 font-mono px-2 ${
                      order.status == "Delivered"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    } text-white rounded-lg `}
                  >
                    {order.status}
                  </div>
                </p>
                <p>Total: ${order.total.toFixed(2)}</p>
                <p>Items: {order.items}</p>
              </div>
              {order.status === "Processing" && (
                <div className="w-1/3">
                  <Progress value={order.progress} className="w-full" />
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">View Details</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
