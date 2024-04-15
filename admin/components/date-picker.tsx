"use client";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({ field }) {
  // Use the field.value as the initial state if it exists
  const [date, setDate] = React.useState<Date>(field.value || new Date());

  // Update the form field when the date changes
  React.useEffect(() => {
    // Only call field.onChange if date is different from field.value
    if (field == null  || undefined) {
      return;
    }

    if (date?.getTime() !== field.value?.getTime()) {
      field.onChange(date);
    }
  }, [date, field]);

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate);
              field.onChange(newDate); // Update the form field
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
