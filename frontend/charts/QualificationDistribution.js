"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import axios from "axios";

export const description =
  "A stacked bar chart showing faculty distribution across departments and qualifications";

const chartConfig = {
  phd: {
    label: "PhD",
    color: "#FF8000",
  },
  mtech: {
    label: "MTech",
    color: "#FFA040",
  },
  btech: {
    label: "BTech",
    color: "#FFC080",
  },
  other: {
    label: "Other",
    color: "#FFE0C0",
  },
};

export function QualificationDistribution() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getInformation();
  }, []);

  const getInformation = async () => {
    setIsLoading(true);
    const selectedFields = [
      "email",
      "gender",
      "department",
      "highestQualification",
    ];
    const selectedTitles = ["User", "PersonalDetails", "ProfessionalDetails"];
    try {
      const { data } = await axios.post("/api/get-information", {
        selectedFields,
        selectedTitles,
      });

      const processedData = processQualificationData(data.postData);
      setData(processedData);
    } catch (e) {
      console.error("Error fetching information:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const processQualificationData = (apiData) => {
    const departmentGroups = apiData.reduce((acc, item) => {
      if (!item.professionalDetails) return acc;

      const dept = item.professionalDetails.department;
      const qualification =
        item.professionalDetails.highestQualification || "Other";

      if (!acc[dept]) {
        acc[dept] = {
          department: dept,
          phd: 0,
          mtech: 0,
          btech: 0,
          other: 0,
        };
      }

      // Categorize qualifications
      if (qualification.toLowerCase().includes("ph.d")) {
        acc[dept].phd++;
      } else if (qualification.toLowerCase().includes("m.tech")) {
        acc[dept].mtech++;
      } else if (qualification.toLowerCase().includes("b.tech")) {
        acc[dept].btech++;
      } else {
        acc[dept].other++;
      }

      console.log(acc);
      return acc;
    }, {});

    return Object.values(departmentGroups).sort((a, b) =>
      a.department.localeCompare(b.department),
    );
  };

  return (
    <Card className="w-[95%]">
      <CardHeader>
        <CardTitle>Qualification Distribution</CardTitle>
        <CardDescription>
          Faculty qualifications across departments
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <ChartContainer config={chartConfig} className="h-80">
          <BarChart
            data={data.length ? data : []}
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
              dataKey="btech"
              stackId="a"
              fill={chartConfig.btech.color}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="other"
              stackId="a"
              fill={chartConfig.other.color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
