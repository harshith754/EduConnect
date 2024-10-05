"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const publicationData = [
  { year: 2014, Comps: 45, DS: 30, AIML: 25, EXTC: 40 },
  { year: 2015, Comps: 50, DS: 35, AIML: 30, EXTC: 38 },
  { year: 2016, Comps: 55, DS: 40, AIML: 35, EXTC: 42 },
  { year: 2017, Comps: 60, DS: 45, AIML: 40, EXTC: 45 },
  { year: 2018, Comps: 65, DS: 50, AIML: 48, EXTC: 47 },
  { year: 2019, Comps: 70, DS: 58, AIML: 55, EXTC: 50 },
  { year: 2020, Comps: 75, DS: 65, AIML: 63, EXTC: 52 },
  { year: 2021, Comps: 80, DS: 72, AIML: 70, EXTC: 55 },
  { year: 2022, Comps: 85, DS: 78, AIML: 80, EXTC: 58 },
  { year: 2023, Comps: 90, DS: 85, AIML: 88, EXTC: 60 },
];

const chartConfig = {
  Comps: {
    label: "Computer Science",
    color: "hsl(var(--chart-4))",
  },
  DS: {
    label: "Data Science",
    color: "hsl(var(--chart-3))",
  },
  AIML: {
    label: "AI/ML",
    color: "hsl(var(--chart-2))",
  },
  EXTC: {
    label: "Electronics & Telecommunication",
    color: "hsl(var(--chart-1))",
  },
};

export default function PublicationsAndResearch() {
  const [activeDepartment, setActiveDepartment] = React.useState("Comps");

  const total = React.useMemo(
    () => ({
      Comps: publicationData.reduce((acc, curr) => acc + curr.Comps, 0),
      DS: publicationData.reduce((acc, curr) => acc + curr.DS, 0),
      AIML: publicationData.reduce((acc, curr) => acc + curr.AIML, 0),
      EXTC: publicationData.reduce((acc, curr) => acc + curr.EXTC, 0),
    }),
    [],
  );

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Department Publications</CardTitle>
          <CardDescription>
            Yearly publications by department over the last 10 years
          </CardDescription>
        </div>
        <div className="flex flex-wrap">
          {Object.entries(chartConfig).map(([key, config]) => (
            <button
              key={key}
              data-active={activeDepartment === key}
              className={`relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-4 py-3 text-left even:border-l sm:border-l sm:border-t-0 sm:px-6 sm:py-4
              ${activeDepartment === key ? "bg-muted text-foreground" : "bg-muted/50 text-muted-foreground"}`}
              onClick={() => setActiveDepartment(key)}
            >
              <span className="text-xs ">{config.label}</span>
              <span className="text-lg font-bold leading-none sm:text-2xl">
                {total[key].toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent style={{ height: "350px" }} className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={publicationData}
            margin={{
              left: 40,
              right: 10,
              top: 10,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{
                value: "Publications",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Bar
              dataKey={activeDepartment}
              fill={chartConfig[activeDepartment].color}
              radius={4}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
