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
import { ChevronDown } from "lucide-react";
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
  {
    id: "1",
    City: "Paris",
    Country: "France",
    Language: "French",
    Wether: "Mild",
    Currency: "Euro",
    Cost: "High",
    Pictures: "/paris-gallery",
  },
  {
    id: "2",
    City: "Bangkok",
    Country: "Thailand",
    Language: "Thai",
    Wether: "Hot",
    Currency: "Baht",
    Cost: "Low",
    Pictures: "/bangkok-gallery",
  },
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
    header: "Pictures",
    cell: ({ row }: any) => (
      <Link to={row.getValue("Pictures")} className="text-blue-500 underline">
        Link
      </Link>
    ),
  },
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
  );
}
