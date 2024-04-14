"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { News } from "@/constants/data";
import axios, { GET_ALL_NEWS } from "@/axios/axios";


export const NewsClient = () => {
  const router = useRouter();
  const [newsData, setNewsData] = useState<News[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(GET_ALL_NEWS);
      const data = await response.data.news;
      setNewsData(data);
    };

    getData();
  }, []);

  // console.log(userData);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Articles (${newsData.length})`}
          description="Manage articles"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/news/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="title" columns={columns} data={newsData} />
    </>
  );
};
