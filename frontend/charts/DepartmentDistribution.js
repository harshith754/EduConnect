import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
const chartConfig = {
  maleCount: {
    label: "Male Count",
    color: "#eb6725",
  },
  femaleCount: {
    label: "Female Count",
    color: "#facc60",
  },
};

const c1 = [
  { department: " CE ", maleCount: 10, femaleCount: 5 },
  { department: " DS ", maleCount: 8, femaleCount: 7 },
  { department: "EXTC", maleCount: 12, femaleCount: 6 },
  { department: "AIML", maleCount: 7, femaleCount: 8 },
];

export const DepartmentDistribution = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Faculty Distribution</CardTitle>
        <CardDescription>
          Showing faculty distribution across departments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] p-5 ">
          <BarChart accessibilityLayer data={c1}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="department"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="maleCount" fill="var(--color-maleCount)" radius={4} />
            <Bar
              dataKey="femaleCount"
              fill="var(--color-femaleCount)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  );
};
