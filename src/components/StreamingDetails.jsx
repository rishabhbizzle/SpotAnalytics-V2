import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChartComponent } from "./barChart";

function calculatePercentageChange(data) {
  try {
    const dates = Object.keys(data);
    const latestDate = dates[dates.length - 1];
    const secondLatestDate = dates[dates.length - 2];

    const latestValue = data[latestDate] || 0;
    const secondLatestValue = data[secondLatestDate] || 0;

    const percentageChange =
      ((latestValue - secondLatestValue) / secondLatestValue) * 100;

    return (
      <p
        className={`text-xs mt-1 ${
          percentageChange > 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {percentageChange.toFixed(2)}% from previous day
      </p>
    );
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default function StreamingDetails({ streamingData, type }) {
  const lastDate = Object.keys(streamingData?.dailyStreams).pop();

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Streams</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {streamingData?.totalStreams?.toLocaleString("en-US")}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Streams</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {streamingData?.dailyStreams[lastDate]?.toLocaleString("en-US")}
            </div>
            {Object.keys(streamingData?.dailyStreams)?.length > 2 && (
              <div>
                {calculatePercentageChange(streamingData?.dailyStreams)}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Daily Streams</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <BarChartComponent data={streamingData?.dailyStreams} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
