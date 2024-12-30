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
import { ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
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

const data: dataPlace[] = [
  {
    id: "1",
    city: "Paris",
    country: "France",
    language: "French",
    wether: "Mild",
    countryCurrency: "Euro",
    cost: "High"
  },
  {
    id: "2",
    city: "Bangkok",
    country: "Thailand",
    language: "Thai",
    wether: "Hot",
    countryCurrency: "Baht",
    cost: "Low"
  },
  {
    id: "3",
    city: "New York",
    country: "USA",
    language: "English",
    wether: "Cold",
    countryCurrency: "USD",
    cost: "High"
  },
  {
    id: "4",
    city: "Tokyo",
    country: "Japan",
    language: "Japanese",
    wether: "Temperate",
    countryCurrency: "Yen",
    cost: "High"
  },
  {
    id: "5",
    city: "London",
    country: "UK",
    language: "English",
    wether: "Rainy",
    countryCurrency: "Pound",
    cost: "High"
  },
  {
    id: "6",
    city: "Berlin",
    country: "Germany",
    language: "German",
    wether: "Cold",
    countryCurrency: "Euro",
    cost: "Moderate"
  },
  {
    id: "7",
    city: "Rome",
    country: "Italy",
    language: "Italian",
    wether: "Warm",
    countryCurrency: "Euro",
    cost: "Moderate"
  },
  {
    id: "8",
    city: "Sydney",
    country: "Australia",
    language: "English",
    wether: "Hot",
    countryCurrency: "AUD",
    cost: "High"
  },
  {
    id: "9",
    city: "Rio de Janeiro",
    country: "Brazil",
    language: "Portuguese",
    wether: "Tropical",
    countryCurrency: "Real",
    cost: "Moderate"
  },
  {
    id: "10",
    city: "Cape Town",
    country: "South Africa",
    language: "Afrikaans",
    wether: "Mild",
    countryCurrency: "Rand",
    cost: "Moderate"
  },
  {
    id: "11",
    city: "Moscow",
    country: "Russia",
    language: "Russian",
    wether: "Cold",
    countryCurrency: "Ruble",
    cost: "Moderate"
  },
  {
    id: "12",
    city: "Dubai",
    country: "UAE",
    language: "Arabic",
    wether: "Hot",
    countryCurrency: "Dirham",
    cost: "High"
  },
  {
    id: "13",
    city: "Seoul",
    country: "South Korea",
    language: "Korean",
    wether: "Cold",
    countryCurrency: "Won",
    cost: "Moderate"
  },
  {
    id: "14",
    city: "Amsterdam",
    country: "Netherlands",
    language: "Dutch",
    wether: "Mild",
    countryCurrency: "Euro",
    cost: "Moderate"
  },
  {
    id: "15",
    city: "Madrid",
    country: "Spain",
    language: "Spanish",
    wether: "Hot",
    countryCurrency: "Euro",
    cost: "Moderate"
  },
  {
    id: "16",
    city: "Lisbon",
    country: "Portugal",
    language: "Portuguese",
    wether: "Warm",
    countryCurrency: "Euro",
    cost: "Moderate"
  },
  {
    id: "17",
    city: "Los Angeles",
    country: "USA",
    language: "English",
    wether: "Hot",
    countryCurrency: "USD",
    cost: "High"
  },
  {
    id: "18",
    city: "Barcelona",
    country: "Spain",
    language: "Spanish",
    wether: "Mild",
    countryCurrency: "Euro",
    cost: "Moderate"
  },
  {
    id: "19",
    city: "San Francisco",
    country: "USA",
    language: "English",
    wether: "Mild",
    countryCurrency: "USD",
    cost: "High"
  },
  {
    id: "20",
    city: "Bangkok",
    country: "Thailand",
    language: "Thai",
    wether: "Hot",
    countryCurrency: "Baht",
    cost: "Low"
  },
  {
    id: "21",
    city: "Hong Kong",
    country: "China",
    language: "Cantonese",
    wether: "Tropical",
    countryCurrency: "HKD",
    cost: "High"
  },
  {
    id: "22",
    city: "Buenos Aires",
    country: "Argentina",
    language: "Spanish",
    wether: "Warm",
    countryCurrency: "Peso",
    cost: "Moderate"
  },
  {
    id: "23",
    city: "Cairo",
    country: "Egypt",
    language: "Arabic",
    wether: "Hot",
    countryCurrency: "Pound",
    cost: "Low"
  },
  {
    id: "24",
    city: "Singapore",
    country: "Singapore",
    language: "English",
    wether: "Tropical",
    countryCurrency: "SGD",
    cost: "High"
  },
  {
    id: "25",
    city: "Istanbul",
    country: "Turkey",
    language: "Turkish",
    wether: "Mild",
    countryCurrency: "Lira",
    cost: "Moderate"
  },
  {
    id: "26",
    city: "Lagos",
    country: "Nigeria",
    language: "English",
    wether: "Tropical",
    countryCurrency: "Naira",
    cost: "Low"
  },
  {
    id: "27",
    city: "Mexico City",
    country: "Mexico",
    language: "Spanish",
    wether: "Tropical",
    countryCurrency: "Peso",
    cost: "Moderate"
  },
  {
    id: "28",
    city: "Vancouver",
    country: "Canada",
    language: "English",
    wether: "Cold",
    countryCurrency: "CAD",
    cost: "High"
  },
  {
    id: "29",
    city: "Stockholm",
    country: "Sweden",
    language: "Swedish",
    wether: "Cold",
    countryCurrency: "Krona",
    cost: "High"
  },
  {
    id: "30",
    city: "Athens",
    country: "Greece",
    language: "Greek",
    wether: "Warm",
    countryCurrency: "Euro",
    cost: "Moderate"
  },
  {
    id: "31",
    city: "Montreal",
    country: "Canada",
    language: "French",
    wether: "Cold",
    countryCurrency: "CAD",
    cost: "Moderate"
  },
  {
    id: "32",
    city: "Kuala Lumpur",
    country: "Malaysia",
    language: "Malay",
    wether: "Tropical",
    countryCurrency: "MYR",
    cost: "Moderate"
  },
  {
    id: "33",
    city: "Chicago",
    country: "USA",
    language: "English",
    wether: "Cold",
    countryCurrency: "USD",
    cost: "High"
  },
  {
    id: "34",
    city: "Madrid",
    country: "Spain",
    language: "Spanish",
    wether: "Hot",
    countryCurrency: "Euro",
    cost: "Moderate"
  },
  {
    id: "35",
    city: "Prague",
    country: "Czech Republic",
    language: "Czech",
    wether: "Cold",
    countryCurrency: "Krona",
    cost: "Moderate"
  }
]


export type dataPlace = {
  id: string,
  city: string,
  country: string,
  language: string,
  wether: string,
  countryCurrency: string,
  cost: string
}

export const columns: ColumnDef<dataPlace, any>[] = [
  {
    accessorKey: "city",
    header: "City",
    cell: ({ row }: any) => <div>{row.getValue("city")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }: any) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "language",
    header: "Language",
    cell: ({ row }: any) => <div>{row.getValue("language")}</div>,
  },
  {
    accessorKey: "wether",
    header: "Weather",
    cell: ({ row }: any) => <div>{row.getValue("wether")}</div>,
  },
  {
    accessorKey: "countryCurrency",
    header: "Currency",
    cell: ({ row }: any) => <div>{row.getValue("countryCurrency")}</div>,
  },
  {
    accessorKey: "cost",
    header: "Cost",
    cell: ({ row }: any) => <div>{row.getValue("cost")}</div>,
  }
]

export function PlaceSuggestions() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [selectedColumn, setSelectedColumn] = React.useState<string>('city') 

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              {selectedColumn ? selectedColumn : "Select column to filter"} <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {columns.map((col) => (
              <DropdownMenuItem
                key={col.id}
                onClick={() => setSelectedColumn(col.accessorKey || col.id)}
              >
                {col.header as React.ReactNode}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Input
          placeholder={`Filter by ${selectedColumn}...`}
          value={(table.getColumn(selectedColumn)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(selectedColumn)?.setFilterValue(event.target.value)
          }
          className="flex-1"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
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
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
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
