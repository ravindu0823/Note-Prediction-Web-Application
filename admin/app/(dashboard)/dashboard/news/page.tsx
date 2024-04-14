import BreadCrumb from "@/components/breadcrumb";
import { NewsClient } from "@/components/tables/news-tables/client";
import React from "react";

const breadcrumbItems = [{ title: "News", link: "/dashboard/news" }];

export default function Page() {
  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <NewsClient />
    </div>
  );
}
