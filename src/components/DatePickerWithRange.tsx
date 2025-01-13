import * as React from "react";
import { format, differenceInDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function DatePickerWithRange(
  { onPeriodChange, onDaysQtyChange, status }: 
  { onPeriodChange: (period: string) => void, onDaysQtyChange: (daysQty: number) => void, status: number }
) {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  const [isMobile, setIsMobile] = React.useState(false);

  const daysInterval = date?.from && date?.to ? differenceInDays(date.to, date.from) + 1 : 0;
  const formattedPeriod = date?.from && date?.to 
    ? `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}` 
    : "";

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    onDaysQtyChange(daysInterval);
    if (formattedPeriod) {
      onPeriodChange(formattedPeriod);
    }
  }, [daysInterval, formattedPeriod]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outlineInput"}
          className={cn(
            "w-full justify-start text-left font-normal text-[4.5vw] xxs5:text-[4vw] xs:text-sm sm:text-base gap-2 px-1",
            !date && "text-muted-foreground",
            status === 5 ? "border-red-500" : ""
          )}
        >
          <CalendarIcon className="w-[6vw] xs:w-auto h-auto" />
          {date?.from ? (
            date.to ? (
              <>{formattedPeriod} - {daysInterval} days</>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {isMobile ? (
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
          />
        ) : (
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
