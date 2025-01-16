import { Input, InputIntegraded } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTriggerInput, SelectValue } from "./ui/select";

export function CurrencyInput({ amount, onAmountChange, status }: { amount: number, onAmountChange: (amount: string) => void, status: number}) {

  return (
    <div className="flex items-center w-full">
      <InputIntegraded
        type="text"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
        className={`w-full ${status === 5 ? "border-red-500" : ""}`}
      />
      <Select defaultValue="USD">
        <SelectTriggerInput className="w-24">
          <SelectValue placeholder="Currency" />
        </SelectTriggerInput>
        <SelectContent>
          <SelectItem value="USD">USD</SelectItem>
          <SelectItem value="EUR">EUR</SelectItem>
          <SelectItem value="BRL">BRL</SelectItem>
          <SelectItem value="GBP">GBP</SelectItem>
          <SelectItem value="JPY">JPY</SelectItem>
          <SelectItem value="AUD">AUD</SelectItem>
          <SelectItem value="CAD">CAD</SelectItem>
          <SelectItem value="CHF">CHF</SelectItem>
          <SelectItem value="CNY">CNY</SelectItem>
          <SelectItem value="INR">INR</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
