const { Button } = require("@/components/ui/button");
const { Input } = require("@/components/ui/input");
const { Label } = require("@radix-ui/react-label");

export function renderProfile() {
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4"></div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue={user.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" defaultValue={user.email} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" defaultValue={user.phone} />
        </div>
      </div>
      <Button className="bg-base-600">Save Changes</Button>
    </div>
  );
}
