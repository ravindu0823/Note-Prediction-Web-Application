"use client";

import axios, { GET_ALL_NEWS } from "@/axios/axios";
import BreadCrumb from "@/components/breadcrumb";
import { NewsForm } from "@/components/forms/news-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { News } from "@/constants/data";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const breadcrumbItems = [
  { title: "News", link: "/dashboard/news" },
  { title: "Create", link: "/dashboard/news/create" },
];

export default function Page() {
  const [newsData, setNewsData] = useState<News>();
  const { newsId } = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${GET_ALL_NEWS}/${newsId}`);
      const news = await response.data;
      setNewsData(news);
    };

    getData();
  }, [newsId]);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        {newsData && (
          <NewsForm
            initialData={{
              _id: newsData._id,
              category: newsData.category,
              title: newsData.title,
              target: newsData.target,
              desc: newsData.desc,
              date: new Date(),
              image: newsData.image,
            }}
            key={null}
          />
        )}
      </div>
    </ScrollArea>
  );
}
