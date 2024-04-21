"use client";
import axios, { GET_ALL_USERS } from "@/axios/axios";
import BreadCrumb from "@/components/breadcrumb";
import { UserForm } from "@/components/forms/product-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "@/constants/data";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const breadcrumbItems = [
  { title: "User", link: "/dashboard/user" },
  { title: "Create", link: "/dashboard/user/create" },
];

export default function Page() {
  const [userData, setUserData] = useState<User>();
  const { userId } = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${GET_ALL_USERS}/${userId}`);
      const { user } = await response.data;
      setUserData(user);
    };

    getData();
  }, [userId]);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        {userData && (
          <UserForm
            initialData={{
              _id: userData._id,
              username: userData.userName,
              fullName: userData.fullName,
              email: userData.email,
            }}
            key={null}
          />
        )}
      </div>
    </ScrollArea>
  );
}
