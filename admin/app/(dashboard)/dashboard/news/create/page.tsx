import BreadCrumb from "@/components/breadcrumb";
import { NewsForm } from "@/components/forms/news-form";

const breadcrumbItems = [{ title: "News", link: "/newsuser/create" }];

export default function Page() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <NewsForm initialData={null} key={null} />
      </div>
    </>
  );
}
