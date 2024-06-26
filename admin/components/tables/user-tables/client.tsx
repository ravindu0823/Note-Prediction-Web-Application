"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { User } from "@/constants/data";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import axios, { GET_ALL_USERS } from "@/axios/axios";

export const UserClient = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(GET_ALL_USERS);
      const data = await response.data;
      setUserData(data);
    };

    getData();
  }, [router]);

  // console.log(userData);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Users (${userData.length})`}
          description="Manage user accounts"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user/create`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="fullName" columns={columns} data={userData} />
    </>
  );
};
