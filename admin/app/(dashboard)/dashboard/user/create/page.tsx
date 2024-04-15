import BreadCrumb from "@/components/breadcrumb";
import { UserForm } from "@/components/forms/product-form";

const breadcrumbItems = [{ title: "User", link: "/dashboard/user/create" }];

export default function Page() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <UserForm initialData={null} key={null} />
      </div>
    </>
  );
}
