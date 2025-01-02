"use client"

import * as React from "react";
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
} from "@tanstack/react-table";
import { ChevronDown, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: dataPlace[] = [
  { id: "1", City: "Paris", Country: "France", Language: "French", Wether: "Mild", Currency: "Euro", Cost: "High", Pictures: "https://www.google.com/search?q=Paris&tbm=isch" },
  { id: "2", City: "Bangkok", Country: "Thailand", Language: "Thai", Wether: "Hot", Currency: "Baht", Cost: "Low", Pictures: "https://www.google.com/search?q=Bangkok&tbm=isch" },
  { id: "3", City: "New York", Country: "USA", Language: "English", Wether: "Cold", Currency: "USD", Cost: "High", Pictures: "https://www.google.com/search?q=New+York&tbm=isch" },
  { id: "4", City: "Tokyo", Country: "Japan", Language: "Japanese", Wether: "Temperate", Currency: "Yen", Cost: "High", Pictures: "https://www.google.com/search?q=Tokyo&tbm=isch" },
  { id: "5", City: "London", Country: "UK", Language: "English", Wether: "Rainy", Currency: "Pound", Cost: "High", Pictures: "https://www.google.com/search?q=London&tbm=isch" },
  { id: "6", City: "Berlin", Country: "Germany", Language: "German", Wether: "Cold", Currency: "Euro", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Berlin&tbm=isch" },
  { id: "7", City: "Rome", Country: "Italy", Language: "Italian", Wether: "Warm", Currency: "Euro", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Rome&tbm=isch" },
  { id: "8", City: "Sydney", Country: "Australia", Language: "English", Wether: "Hot", Currency: "AUD", Cost: "High", Pictures: "https://www.google.com/search?q=Sydney&tbm=isch" },
  { id: "9", City: "Rio de Janeiro", Country: "Brazil", Language: "Portuguese", Wether: "Tropical", Currency: "Real", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Rio+de+Janeiro&tbm=isch" },
  { id: "10", City: "Cape Town", Country: "South Africa", Language: "Afrikaans", Wether: "Mild", Currency: "Rand", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Cape+Town&tbm=isch" },
  { id: "11", City: "Moscow", Country: "Russia", Language: "Russian", Wether: "Cold", Currency: "Ruble", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Moscow&tbm=isch" },
  { id: "12", City: "Dubai", Country: "UAE", Language: "Arabic", Wether: "Hot", Currency: "Dirham", Cost: "High", Pictures: "https://www.google.com/search?q=Dubai&tbm=isch" },
  { id: "13", City: "Seoul", Country: "South Korea", Language: "Korean", Wether: "Cold", Currency: "Won", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Seoul&tbm=isch" },
  { id: "14", City: "Amsterdam", Country: "Netherlands", Language: "Dutch", Wether: "Mild", Currency: "Euro", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Amsterdam&tbm=isch" },
  { id: "15", City: "Madrid", Country: "Spain", Language: "Spanish", Wether: "Hot", Currency: "Euro", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Madrid&tbm=isch" },
  { id: "16", City: "Lisbon", Country: "Portugal", Language: "Portuguese", Wether: "Warm", Currency: "Euro", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Lisbon&tbm=isch" },
  { id: "17", City: "Los Angeles", Country: "USA", Language: "English", Wether: "Hot", Currency: "USD", Cost: "High", Pictures: "https://www.google.com/search?q=Los+Angeles&tbm=isch" },
  { id: "18", City: "Barcelona", Country: "Spain", Language: "Spanish", Wether: "Mild", Currency: "Euro", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Barcelona&tbm=isch" },
  { id: "19", City: "San Francisco", Country: "USA", Language: "English", Wether: "Mild", Currency: "USD", Cost: "High", Pictures: "https://www.google.com/search?q=San+Francisco&tbm=isch" },
  { id: "20", City: "Hong Kong", Country: "China", Language: "Cantonese", Wether: "Tropical", Currency: "HKD", Cost: "High", Pictures: "https://www.google.com/search?q=Hong+Kong&tbm=isch" },
  { id: "21", City: "Buenos Aires", Country: "Argentina", Language: "Spanish", Wether: "Warm", Currency: "Peso", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Buenos+Aires&tbm=isch" },
  { id: "22", City: "Cairo", Country: "Egypt", Language: "Arabic", Wether: "Hot", Currency: "Pound", Cost: "Low", Pictures: "https://www.google.com/search?q=Cairo&tbm=isch" },
  { id: "23", City: "Singapore", Country: "Singapore", Language: "English", Wether: "Tropical", Currency: "SGD", Cost: "High", Pictures: "https://www.google.com/search?q=Singapore&tbm=isch" },
  { id: "24", City: "Istanbul", Country: "Turkey", Language: "Turkish", Wether: "Mild", Currency: "Lira", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Istanbul&tbm=isch" },
  { id: "25", City: "Lagos", Country: "Nigeria", Language: "English", Wether: "Tropical", Currency: "Naira", Cost: "Low", Pictures: "https://www.google.com/search?q=Lagos&tbm=isch" },
  { id: "26", City: "Mexico City", Country: "Mexico", Language: "Spanish", Wether: "Tropical", Currency: "Peso", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Mexico+City&tbm=isch" },
  { id: "27", City: "Vancouver", Country: "Canada", Language: "English", Wether: "Cold", Currency: "CAD", Cost: "High", Pictures: "https://www.google.com/search?q=Vancouver&tbm=isch" },
  { id: "28", City: "Stockholm", Country: "Sweden", Language: "Swedish", Wether: "Cold", Currency: "Krona", Cost: "High", Pictures: "https://www.google.com/search?q=Stockholm&tbm=isch" },
  { id: "29", City: "Athens", Country: "Greece", Language: "Greek", Wether: "Warm", Currency: "Euro", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Athens&tbm=isch" },
  { id: "30", City: "Montreal", Country: "Canada", Language: "French", Wether: "Cold", Currency: "CAD", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Montreal&tbm=isch" },
  { id: "31", City: "Lagos", Country: "Nigeria", Language: "English", Wether: "Tropical", Currency: "Naira", Cost: "Low", Pictures: "https://www.google.com/search?q=Lagos&tbm=isch" },
  { id: "32", City: "Seoul", Country: "South Korea", Language: "Korean", Wether: "Cold", Currency: "Won", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Seoul&tbm=isch" },
  { id: "33", City: "Cairo", Country: "Egypt", Language: "Arabic", Wether: "Hot", Currency: "Pound", Cost: "Low", Pictures: "https://www.google.com/search?q=Cairo&tbm=isch" },
  { id: "34", City: "Kuala Lumpur", Country: "Malaysia", Language: "Malay", Wether: "Tropical", Currency: "MYR", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Kuala+Lumpur&tbm=isch" },
  { id: "35", City: "Hong Kong", Country: "China", Language: "Cantonese", Wether: "Tropical", Currency: "HKD", Cost: "High", Pictures: "https://www.google.com/search?q=Hong+Kong&tbm=isch" }
];



export type dataPlace = {
  id: string;
  City: string;
  Country: string;
  Language: string;
  Wether: string;
  Currency: string;
  Cost: string;
  Pictures: string;
};

export const columns: ColumnDef<dataPlace, any>[] = [
  {
    accessorKey: "City",
    header: "City",
    cell: ({ row }: any) => <div>{row.getValue("City")}</div>,
  },
  {
    accessorKey: "Country",
    header: "Country",
    cell: ({ row }: any) => <div>{row.getValue("Country")}</div>,
  },
  {
    accessorKey: "Language",
    header: "Language",
    cell: ({ row }: any) => <div>{row.getValue("Language")}</div>,
  },
  {
    accessorKey: "Wether",
    header: "Weather",
    cell: ({ row }: any) => <div>{row.getValue("Wether")}</div>,
  },
  {
    accessorKey: "Currency",
    header: "Currency",
    cell: ({ row }: any) => <div>{row.getValue("Currency")}</div>,
  },
  {
    accessorKey: "Cost",
    header: "Cost",
    cell: ({ row }: any) => <div>{row.getValue("Cost")}</div>,
  },
  {
    accessorKey: "Pictures",
    cell: ({ row }: any) => (
      <a href={row.getValue("Pictures")} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
        Link
      </a>
    )
  },
  {
    accessorKey: "Go to this place",
    cell: ({ row }: any) => (
      <MoveRight className="hover:translate-x-1 transition-all"/>
    )
  }
];

export function PlaceSuggestions() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedColumn, setSelectedColumn] = React.useState<string>("City");

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
  });

  return (
    <div className="w-[80vw] xs:w-[60vw] lg:w-[53vw] lg:max-h-[33vw]">
      <div className="flex items-center py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="ml-auto">
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
  );
}
