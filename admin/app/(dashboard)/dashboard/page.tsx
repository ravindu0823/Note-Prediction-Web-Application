"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import jwt from "jsonwebtoken";
import axios, {
  ACTIVE_FEEDBACK_COUNT,
  ACTIVE_USER_COUNT,
  NEWS_COUNT,
  PREDICT_COUNT,
} from "@/axios/axios";
import { useEffect, useState } from "react";
import { getCookie } from "@/lib/token";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

interface AdminCookieProps {
  adminId: string;
  adminName: string;
  adminEmail: string;
}

interface DashbordeProps {
  totalUsers: string;
  totalNewsArticles: string;
  totalFeedbacks: string;
  totalPredictions: string;
}

export default function Page() {
  const [dashboardData, setDashboardData] = useState<DashbordeProps>({
    totalUsers: "Loading...",
    totalNewsArticles: "Loading...",
    totalFeedbacks: "Loading...",
    totalPredictions: "Loading...",
  });

  const [token, setToken] = useState<RequestCookie>({
    name: "",
    value: "",
  });

  useEffect(() => {
    const getToken = async () => {
      const token = await getCookie("token");
      setToken(token);
    };
    getToken();
  }, []);

  const decodedToken: AdminCookieProps = jwt.decode(
    token.value,
  ) as AdminCookieProps;

  useEffect(() => {
    const getAllCounts = async () => {
      const activeUserCount = await axios.get(ACTIVE_USER_COUNT);
      const activeFeedbackCount = await axios.get(ACTIVE_FEEDBACK_COUNT);
      const newsCount = await axios.get(NEWS_COUNT);
      const predictCount = await axios.get(PREDICT_COUNT);

      if (
        activeUserCount.status === 400 ||
        activeFeedbackCount.status === 400 ||
        newsCount.status === 400 ||
        predictCount.status === 400
      )
        return;

      setDashboardData({
        totalUsers: activeUserCount.data.count,
        totalNewsArticles: newsCount.data.count,
        totalFeedbacks: activeFeedbackCount.data.count,
        totalPredictions: predictCount.data.count,
      });
    };
    getAllCounts();
  }, []);

  console.log(dashboardData);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi {decodedToken && decodedToken.adminName}, Welcome back 👋
          </h2>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 lg:mt-12">
              <h3 className="text-2xl font-bold tracking-tight">Overview</h3>
              <Card className="border border-blue-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Users
                  </CardTitle>
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
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardData.totalUsers}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-blue-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total News Articles
                  </CardTitle>
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
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardData.totalNewsArticles}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-blue-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Feedbacks
                  </CardTitle>
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
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardData.totalFeedbacks}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-blue-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Predictions
                  </CardTitle>
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
                    {dashboardData.totalPredictions}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +201 since last hour
                  </p>
                </CardContent>
              </Card>
            </div>
            {/* <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div> */}
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
