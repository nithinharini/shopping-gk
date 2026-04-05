import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../components/common/card";

export default {
  title: "Common/Card",
  component: Card,
};

export const Default = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Wireless Headphones</CardTitle>
        <CardDescription>Noise cancelling premium sound</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600">
          Lightweight design with all-day comfort and long battery life.
        </p>
      </CardContent>
      <CardFooter>
        <p className="font-semibold text-slate-900">$199</p>
      </CardFooter>
    </Card>
  ),
};