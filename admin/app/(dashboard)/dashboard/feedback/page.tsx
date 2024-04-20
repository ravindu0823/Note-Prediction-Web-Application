import BreadCrumb from "@/components/breadcrumb";
import { FeedbackClient } from "@/components/tables/feedback-tables/client";
import React from "react";

const breadcrumbItems = [{ title: "Feedback", link: "/dashboard/feedback" }];

export default function Page() {
  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <FeedbackClient />
    </div>
  )
}
