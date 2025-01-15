"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trip } from "@/types/types"

const getCurrencyInfo = (symbol: string): { currencyCode: string; locale: string } => {
  switch (symbol) {
    case "$":
      return { currencyCode: "USD", locale: "en-US" }; // US Dollar
    case "R$":
      return { currencyCode: "BRL", locale: "pt-BR" }; // Brazilian Real
    case "£":
      return { currencyCode: "GBP", locale: "en-GB" }; // British Pound
    case "¥":
      return { currencyCode: "JPY", locale: "ja-JP" }; // Japanese Yen
    case "A$":
      return { currencyCode: "AUD", locale: "en-AU" }; // Australian Dollar
    case "₹":
      return { currencyCode: "INR", locale: "en-IN" }; // Indian Rupee
    default:
      return { currencyCode: "USD", locale: "en-US" }; // Default to USD if symbol is not recognized
  }
};

const data: Trip[] = [
    {
        id: '8515805175548993886',
        tripName: 'Trip to Antarctica',
        period: 'Mar 04, 2026 - Mar 16, 2026',
        daysQty: 13,
        placesQty: 4,
        currency: '$', // USD
        budgetAmount: 5000,
    },
    {
        id: '3370619451634542461',
        tripName: 'WWWWWWWWWWWWWWW',
        period: 'Jul 05, 2025 - Jul 12, 2025',
        daysQty: 8,
        placesQty: 5,
        currency: 'R$', // BRL
        budgetAmount: 15000,
    },
    {
        id: '2309724424561533844',
        tripName: 'Trip to Africa',
        period: 'Dec 26, 2026 - Jan 07, 2027',
        daysQty: 13,
        placesQty: 2,
        currency: '£', // GBP
        budgetAmount: 4000,
    },
    {
        id: '843957364789331813',
        tripName: 'Trip to South America',
        period: 'Oct 31, 2025 - Nov 04, 2025',
        daysQty: 5,
        placesQty: 4,
        currency: '¥', // JPY
        budgetAmount: 500000,
    },
    {
        id: '7092866250445387125',
        tripName: 'Trip to Africa',
        period: 'Jun 26, 2025 - Jul 08, 2025',
        daysQty: 13,
        placesQty: 5,
        currency: 'A$', // AUD
        budgetAmount: 7000,
    },
    {
        id: '426362703034783719',
        tripName: 'Trip to Antarctica',
        period: 'Jun 15, 2026 - Jun 20, 2026',
        daysQty: 6,
        placesQty: 1,
        currency: '₹', // INR
        budgetAmount: 100000,
    },
]

export const columns: ColumnDef<Trip>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tripName",
    header: "Trip Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("tripName")}</div>
    ),
  },
  {
    accessorKey: "period",
    header: "Period",
    cell: ({ row }) => <div className="lowercase">{row.getValue("period")}</div>,
  },
  {
    accessorKey: "daysQty",
    header: "Duration",
    cell: ({ row }) => <div className="lowercase">{row.getValue("daysQty")} days</div>,
  },
  {
    accessorKey: "placesQty",
    header: "placesQty",
    cell: ({ row }) => <div className="lowercase">{row.getValue("placesQty")} places</div>,
  },
  {
    accessorKey: "budgetAmount",
    header: () => <div className="text-right">Budget</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("budgetAmount"));
  
      const currencySymbol: string = row.getValue("currency");
  
      // Chama a função para obter o código da moeda e o local correto
      const { currencyCode, locale }: { currencyCode: string; locale: string } = getCurrencyInfo(currencySymbol);
  
      // Formata o valor com base no código da moeda e no local
      const formatted = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currencyCode,
        currencyDisplay: "symbol",  // Usar símbolo da moeda
      }).format(amount);
  
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },  
  {
    id: "options",
    enableHiding: false,
    cell: ({ row }) => {

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                Edit Trip
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                Delete Trip
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Duplicate Trip
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function DisplayTrips() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
