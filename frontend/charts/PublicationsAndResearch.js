"use client";

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

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const chartConfig = {
  Comps: {
    label: "Computer Engineering",
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
  const [activeDepartment, setActiveDepartment] = useState("Comps");
  const [isLoading, setIsLoading] = useState(false);
  const [publicationData, setPublicationData] = useState([]);
  const { data: session } = useSession();

  const processPublicationData = (data) => {
    // Group publications by year and department
    const publicationsByYear = {};
    data.forEach((item) => {
      if (item.professionalDetails && item.papersPublished) {
        // Extract year from the papers' years of publication
        item.papersPublished.papers.forEach((paper) => {
          const year = parseInt(paper.yearOfPublication);
          const department = item.professionalDetails.department || "Unknown";

          if (!publicationsByYear[year]) {
            publicationsByYear[year] = {
              year,
              Comps: 0,
              DS: 0,
              AIML: 0,
              EXTC: 0,
            };
          }

          // Increment the count for the specific department
          switch (department) {
            case "Computer Engineering":
              publicationsByYear[year].Comps++;
              break;
            case "Data Science":
              publicationsByYear[year].DS++;
              break;
            case "Artificial Intelligence and Machine Learning (AIML)":
              publicationsByYear[year].AIML++;
              break;
            case "Electronics and Telecommunication Engineering (EXTC)":
              publicationsByYear[year].EXTC++;
              break;
          }
        });
      }
    });

    // Convert to array and sort by year
    return Object.values(publicationsByYear).sort((a, b) => a.year - b.year);
  };

  const getInformation = async () => {
    setIsLoading(true);
    const selectedFields = [
      "department",
      "yearOfPublication",
      "numberOfCitations",
    ];
    const selectedTitles = ["ProfessionalDetails", "PapersPublished"];
    try {
      const { data } = await axios.post("/api/get-information", {
        selectedFields,
        selectedTitles,
        instituteName: session?.user?.instituteName,
      });

      console.log(JSON.stringify(data.postData));
      // Process the data into publication years
      const processedData = processPublicationData(data.postData);
      console.log(processedData);
      setPublicationData(processedData);
    } catch (e) {
      console.error("Error fetching information:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInformation();
  }, []);

  const total = useMemo(() => {
    if (publicationData.length === 0)
      return {
        Comps: 0,
        DS: 0,
        AIML: 0,
        EXTC: 0,
      };

    return {
      Comps: publicationData.reduce((acc, curr) => acc + curr.Comps, 0),
      DS: publicationData.reduce((acc, curr) => acc + curr.DS, 0),
      AIML: publicationData.reduce((acc, curr) => acc + curr.AIML, 0),
      EXTC: publicationData.reduce((acc, curr) => acc + curr.EXTC, 0),
    };
  }, [publicationData]);

  // Fallback to default data if no data is loaded
  const chartData =
    publicationData.length > 0
      ? publicationData
      : [
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

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Department Publications</CardTitle>
          <CardDescription>Yearly publications by department</CardDescription>
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
            data={chartData}
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
