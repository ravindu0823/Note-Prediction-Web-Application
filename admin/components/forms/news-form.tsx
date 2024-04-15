"use client";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
// import FileUpload from "@/components/FileUpload";
import { useToast } from "../ui/use-toast";
import FileUpload from "../file-upload";
import { AlertModal } from "../modal/alert-modal";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { DatePicker } from "../date-picker";
import axios, { CREATE_NEWS, DELETE_NEWS, UPDATE_NEWS } from "@/axios/axios";

export const IMG_MAX_LIMIT = 1;

const formSchema = z.object({
  _id: z.string().optional(),
  category: z
    .string()
    .min(3, { message: "Category must be at least 3 characters" }),
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  target: z
    .string()
    .min(3, { message: "Target must be at least 3 characters" }),
  desc: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" }),
  date: z
    .date()
    .min(new Date(), { message: "Date must be at least today" })
    .optional(),
  image: z
    .string()
    .min(1, { message: "Image URI must be at least 3 characters" }),
});

type NewsFormValues = z.infer<typeof formSchema>;

interface NewsFormProps {
  initialData: any | null;
}

export const NewsForm: React.FC<NewsFormProps> = ({ initialData }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const title = initialData ? "Edit News" : "Create News";
  const description = initialData ? "Edit News." : "Add a News";
  const action = initialData ? "Save changes" : "Create News";

  const defaultValues = initialData
    ? initialData
    : {
        category: "",
        title: "",
        target: "",
        desc: "",
        date: new Date(),
        image: "",
      };

  const form = useForm<NewsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    data: NewsFormValues,
  ) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (initialData) {
        // console.log(initialData._id);
        // console.log(data);
        // console.log(data.date.toDateString());

        const newsData = {
          category: data.category,
          title: data.title,
          target: data.target,
          desc: data.desc,
          date: data.date.toDateString(),
          image: data.image,
        };

        const response = await axios.put(
          `${UPDATE_NEWS}/${initialData._id}`,
          newsData,
        );

        if (response.status === 200) {
          toast({
            variant: "default",
            title: "Success",
            description: "News updated successfully.",
          });

          router.push(`/dashboard/news`);
        }
      } else {
        console.log(data);

        const newsData = {
          category: data.category,
          title: data.title,
          target: data.target,
          desc: data.desc,
          date: data.date.toDateString(),
          image: data.image,
        };

        const response = await axios.post(CREATE_NEWS, newsData);

        if (response.status === 201) {
          toast({
            variant: "default",
            title: "Success",
            description: "News created successfully.",
          });

          router.push(`/dashboard/news`);
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      const response = await axios.delete(`${DELETE_NEWS}/${initialData._id}`);

      if (response.status === 200) {
        toast({
          variant: "default",
          title: "Success",
          description: "News deleted.",
        });
      }
      setLoading(false);
      setOpen(false);

      router.push(`/dashboard/news`);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });

      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={(e) => form.handleSubmit((data) => onSubmit(e, data))(e)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-1 gap-8">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Category"
                      value={initialData ? initialData.category : field.value}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <DatePicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Description"
                      value={initialData ? initialData.desc : field.value}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="target"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target (Link)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Target href"
                      value={initialData ? initialData.target : field.value}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Title"
                      value={initialData ? initialData.title : field.value}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URI</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Image URI"
                      value={initialData ? initialData.image : field.value}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
