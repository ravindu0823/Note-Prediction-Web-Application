"use client";
import axios, { DELETE_USER, REACTIVATE_USER } from "@/axios/axios";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { User } from "@/constants/data";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CellActionProps {
  data: User;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [reactivateOpen, setReactivateOpen] = useState(false);
  const router = useRouter();

  const onDeleteConfirm = async () => {
    setLoading(true);

    const response = await axios.delete(`${DELETE_USER}/${data._id}`);
    if (response.status === 200) {
      toast({
        variant: "default",
        title: "Success",
        description: "User deleted.",
      });
    }

    setLoading(false);
    setDeleteOpen(false);
    router.push("/dashboard");
  };

  const onReactivateConfirm = async () => {
    setLoading(true);

    const response = await axios.put(`${REACTIVATE_USER}/${data._id}`);
    if (response.status === 200) {
      toast({
        variant: "default",
        title: "Success",
        description: "User reactivated.",
      });
    }

    setLoading(false);
    setReactivateOpen(false);
    router.push("/dashboard");
  };

  return (
    <>
      <AlertModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={onDeleteConfirm}
        loading={loading}
      />

      <AlertModal
        isOpen={reactivateOpen}
        onClose={() => setReactivateOpen(false)}
        onConfirm={onReactivateConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          {data.status === "Active" ? (
            <>
              <DropdownMenuItem
                onClick={() => router.push(`/dashboard/user/${data._id}`)}
              >
                <Edit className="mr-2 h-4 w-4" /> Update
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
                <Trash className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem onClick={() => setReactivateOpen(true)}>
                <Trash className="mr-2 h-4 w-4" /> Reactivate
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
