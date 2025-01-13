import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function CurrencyInput() {
  return (
    <div className="flex items-center space-x-2">
      <Input
        type="number"
        placeholder="Enter amount"
        className="w-full"
      />
      <Select>
        <SelectTrigger className="w-24">
          <SelectValue placeholder="Currency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="USD">USD</SelectItem>
          <SelectItem value="EUR">EUR</SelectItem>
          <SelectItem value="BRL">BRL</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
