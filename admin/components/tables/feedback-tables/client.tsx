"use client";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { Feedback } from "@/constants/data";
import axios, { GET_ALL_FEEDBACK } from "@/axios/axios";

export const FeedbackClient = () => {
  const [feedbackData, setFeedbackData] = useState<Feedback[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(GET_ALL_FEEDBACK);
      const data = await response.data;
      setFeedbackData(data);
    };

    getData();
  }, []);


  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Feedbacks (${feedbackData.length})`}
          description="Manage Feedbacks"
        />
      </div>
      <Separator />
      <DataTable searchKey="firstName" columns={columns} data={feedbackData} />
    </>
  );
};
