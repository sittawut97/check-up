"use client";

import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

export default function DatePicker() {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);

  // Format date to Thai format: "01 ธ.ค. 2025"
  const formatThaiDate = (date: Date | undefined) => {
    if (!date) return "เลือกวันที่";
    
    const thaiMonths = [
      "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
      "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
    ];
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = thaiMonths[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  };

  // Handle date selection and close popover
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setOpen(false);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 h-screen">
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-[160px] justify-center">
                  {formatThaiDate(date)}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="p-0">
                <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                className="rounded-xl"
                />
            </PopoverContent>
        </Popover>
    </div>
  );
}
