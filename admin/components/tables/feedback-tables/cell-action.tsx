"use client";
import axios, { ACTIVATE_FEEDBACK, SUSPEND_FEEDBACK } from "@/axios/axios";
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
import { Feedback } from "@/constants/data";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CellActionProps {
  data: Feedback;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [reactivateOpen, setReactivateOpen] = useState(false);
  const router = useRouter();

  const onSuspendConfirm = async () => {
    setLoading(true);

    const response = await axios.put(`${SUSPEND_FEEDBACK}/${data._id}`);
    if (response.status === 200) {
      toast({
        variant: "default",
        title: "Success",
        description: "Feedback Suspended.",
      });
    }

    setLoading(false);
    setDeleteOpen(false);
    router.push("/dashboard");
  };

  const onActivateConfirm = async () => {
    setLoading(true);

    const response = await axios.put(`${ACTIVATE_FEEDBACK}/${data._id}`);
    if (response.status === 200) {
      toast({
        variant: "default",
        title: "Success",
        description: "Feedback Activated.",
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
        onConfirm={onSuspendConfirm}
        loading={loading}
      />

      <AlertModal
        isOpen={reactivateOpen}
        onClose={() => setReactivateOpen(false)}
        onConfirm={onActivateConfirm}
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
              <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
                <Trash className="mr-2 h-4 w-4" /> Suspend
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem onClick={() => setReactivateOpen(true)}>
                <Trash className="mr-2 h-4 w-4" /> Activate
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
