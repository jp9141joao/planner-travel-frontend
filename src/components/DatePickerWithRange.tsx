import * as React from "react";
import { addDays, format, differenceInDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { setItemSessionStorage } from "./utils/utils";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2025, 0, 20),
    to: addDays(new Date(2025, 0, 20), 20),
  });

  const [isMobile, setIsMobile] = React.useState(false); // Estado para controlar o layout
  const daysInterval =
    date?.from && date?.to ? differenceInDays(date.to, date.from) : 0;

  // Verifica o tamanho da tela e ajusta o layout
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Considera 640px como limite para mobile
    };

    handleResize(); // Verifica o tamanho da tela quando o componente é montado
    window.addEventListener("resize", handleResize); // Adiciona o ouvinte de evento para redimensionamento

    return () => {
      window.removeEventListener("resize", handleResize); // Remove o ouvinte de evento quando o componente for desmontado
    };
  }, []);

  React.useEffect(() => {
    setItemSessionStorage("daysInterval", daysInterval);
  }, [daysInterval]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal gap-2 px-1",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} -{" "}
                {format(date.to, "LLL dd, y")}
              </>
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
            mode="range" // Mantém o intervalo para telas pequenas
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1} // Apenas um mês para telas pequenas
            highlightSelected={true} // Garante que o primeiro dia seja destacado
          />
        ) : (
          <Calendar
            initialFocus
            mode="range" // Também é "range", mas pode alterar caso queira "single"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2} // Dois meses para telas maiores
            highlightSelected={true} // Garante que o primeiro dia seja destacado
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
