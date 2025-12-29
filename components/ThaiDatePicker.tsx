'use client';

import { useMemo, useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';

type ThaiDatePickerProps = {
  value?: string; // ISO: YYYY-MM-DD
  onChange: (nextIso: string | undefined) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  fromYear?: number;
  toYear?: number;
};

const formatThaiDate = (date: Date | undefined) => {
  if (!date) return '';

  const thaiMonths = [
    'ม.ค.',
    'ก.พ.',
    'มี.ค.',
    'เม.ย.',
    'พ.ค.',
    'มิ.ย.',
    'ก.ค.',
    'ส.ค.',
    'ก.ย.',
    'ต.ค.',
    'พ.ย.',
    'ธ.ค.'
  ];

  const day = date.getDate().toString().padStart(2, '0');
  const month = thaiMonths[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export default function ThaiDatePicker({
  value,
  onChange,
  disabled,
  placeholder = 'เลือกวันที่',
  className,
  fromYear = 1900,
  toYear = new Date().getFullYear()
}: ThaiDatePickerProps) {
  const [open, setOpen] = useState(false);

  const selected = useMemo(() => {
    if (!value) return undefined;
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? undefined : d;
  }, [value]);

  const label = selected ? formatThaiDate(selected) : placeholder;

  const handleSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) {
      onChange(undefined);
      return;
    }

    const yyyy = selectedDate.getFullYear();
    const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const dd = String(selectedDate.getDate()).padStart(2, '0');
    const iso = `${yyyy}-${mm}-${dd}`;

    onChange(iso);
    setOpen(false);
  };

  return (
    <div className={className ?? ''}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className="w-full justify-start gap-2 px-4 py-2 h-auto"
          >
            <CalendarIcon className="w-4 h-4 text-gray-500" />
            <span className={selected ? 'text-gray-800' : 'text-gray-400'}>{label}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="start">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            captionLayout="dropdown"
            fromYear={fromYear}
            toYear={toYear}
            className="rounded-xl"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
