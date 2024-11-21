import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import axios from "axios";
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/Spinner";

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

export const DepartmentDistribution = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getInformation();
  }, []);

  const getInformation = async () => {
    setIsLoading(true);
    const selectedFields = ["email", "gender", "department"];
    const selectedTitles = ["User", "PersonalDetails", "ProfessionalDetails"];
    try {
      const { data } = await axios.post("/api/get-information", {
        selectedFields,
        selectedTitles,
      });

      // Process the data to group by department and gender
      const departmentCounts = processDepartmentData(data.postData);
      setData(departmentCounts);
    } catch (e) {
      console.error("Error fetching information:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const processDepartmentData = (apiData) => {
    // Group data by department and count males and females
    const departmentGroups = apiData.reduce((acc, item) => {
      // Skip entries with missing professional details
      if (!item.professionalDetails || !item.personalDetails) return acc;

      const dept = item.professionalDetails.department;
      const gender = item.personalDetails.gender;

      // Initialize department if not exists
      if (!acc[dept]) {
        acc[dept] = { department: dept, maleCount: 0, femaleCount: 0 };
      }

      // Increment gender count
      if (gender === "male") {
        acc[dept].maleCount++;
      } else if (gender === "female") {
        acc[dept].femaleCount++;
      }

      return acc;
    }, {});

    // Convert object to array and sort
    return Object.values(departmentGroups).sort((a, b) =>
      a.department.localeCompare(b.department),
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Card className="w-[95%]">
      <CardHeader>
        <CardTitle>Faculty Distribution</CardTitle>
        <CardDescription>
          Showing faculty distribution across departments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] p-5 ">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="department"
              tickLine={false}
              axisLine={false}
              padding={{ left: 5, right: 5 }}
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
    </Card>
  );
};
