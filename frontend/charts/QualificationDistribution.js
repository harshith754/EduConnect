"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description =
  "A stacked bar chart showing student distribution across departments and programs";

const chartData = [
  { department: "Comps", phd: 15, mtech: 50, mca: 80, msc: 30 },
  { department: "EXTC", phd: 10, mtech: 40, mca: 60, msc: 25 },
  { department: "AIML", phd: 20, mtech: 70, mca: 90, msc: 40 },
  { department: "DS", phd: 12, mtech: 45, mca: 75, msc: 35 },
];

const chartConfig = {
  phd: {
    label: "PhD",
    color: "#FF8000",
  },
  mtech: {
    label: "MTech",
    color: "#FFA040",
  },
  mca: {
    label: "MCA",
    color: "#FFC080",
  },
  msc: {
    label: "MSc",
    color: "#FFE0C0",
  },
};
export function QualificationDistribution() {
  return (
    <Card className="w-[95%]">
      <CardHeader>
        <CardTitle>Qualification Distribution</CardTitle>
        <CardDescription>PhD, MTech, MCA, and MSc programs</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <ChartContainer config={chartConfig} className="h-80">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="department"
              tickLine={false}
              axisLine={false}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="phd"
              stackId="a"
              fill={chartConfig.phd.color}
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="mtech"
              stackId="a"
              fill={chartConfig.mtech.color}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="mca"
              stackId="a"
              fill={chartConfig.mca.color}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="msc"
              stackId="a"
              fill={chartConfig.msc.color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          AIML department shows highest enrollment{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing student distribution across departments and programs
        </div>
      </CardFooter> */}
    </Card>
  );
}
