import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const PublicationCharts = ({ publicationData, topicsDataU }) => {
  const topicsData = topicsDataU
    .sort((a, b) => b.numRecords - a.numRecords)
    .slice(0, 15);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Publications by Year</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={publicationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="records" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Research Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={topicsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                interval={0}
                height={50}
                tick={{ fontSize: 8 }}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="numRecords" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="text-sm">Publication Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-4 gap-2">
          <div className="bg-gray-100 p-1 rounded text-center">
            <h3 className="text-sm font-semibold">Total Articles</h3>
            <p className="text-lg">22</p>
          </div>
          <div className="bg-gray-100 p-1 rounded text-center">
            <h3 className="text-sm font-semibold">First Published</h3>
            <p className="text-lg">2018</p>
          </div>
          <div className="bg-gray-100 p-1 rounded text-center">
            <h3 className="text-sm font-semibold">Last Published</h3>
            <p className="text-lg">2024</p>
          </div>
          <div className="bg-gray-100 p-1 rounded text-center">
            <h3 className="text-sm font-semibold">Total Citations</h3>
            <p className="text-lg">197</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicationCharts;
