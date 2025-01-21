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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { dataPlace } from "@/types/types";

const data: dataPlace[] = [
  { id: "1", City: "Paris", Country: "France", Language: "French", Weather: "Mild", Currency: "Euro", Cost: "High", Pictures: "https://www.google.com/search?q=Paris&tbm=isch" },
  { id: "2", City: "Bangkok", Country: "Thailand", Language: "Thai", Weather: "Hot", Currency: "Baht", Cost: "Low", Pictures: "https://www.google.com/search?q=Bangkok&tbm=isch" },
  { id: "3", City: "New York", Country: "USA", Language: "English", Weather: "Cold", Currency: "USD", Cost: "High", Pictures: "https://www.google.com/search?q=New+York&tbm=isch" },
  { id: "4", City: "Tokyo", Country: "Japan", Language: "Japanese", Weather: "Temperate", Currency: "Yen", Cost: "High", Pictures: "https://www.google.com/search?q=Tokyo&tbm=isch" },
  { id: "5", City: "London", Country: "UK", Language: "English", Weather: "Rainy", Currency: "Pound", Cost: "High", Pictures: "https://www.google.com/search?q=London&tbm=isch" },
  { id: "6", City: "Berlin", Country: "Germany", Language: "German", Weather: "Cold", Currency: "Euro", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Berlin&tbm=isch" },
  { id: "7", City: "Rome", Country: "Italy", Language: "Italian", Weather: "Warm", Currency: "Euro", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Rome&tbm=isch" },
  { id: "8", City: "Sydney", Country: "Australia", Language: "English", Weather: "Hot", Currency: "AUD", Cost: "High", Pictures: "https://www.google.com/search?q=Sydney&tbm=isch" },
  { id: "9", City: "Rio de Janeiro", Country: "Brazil", Language: "Portuguese", Weather: "Tropical", Currency: "Real", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Rio+de+Janeiro&tbm=isch" },
  { id: "10", City: "Cape Town", Country: "South Africa", Language: "Afrikaans", Weather: "Mild", Currency: "Rand", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Cape+Town&tbm=isch" },
  { id: "11", City: "Moscow", Country: "Russia", Language: "Russian", Weather: "Cold", Currency: "Ruble", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Moscow&tbm=isch" },
  { id: "12", City: "Dubai", Country: "UAE", Language: "Arabic", Weather: "Hot", Currency: "Dirham", Cost: "High", Pictures: "https://www.google.com/search?q=Dubai&tbm=isch" },
  { id: "13", City: "Seoul", Country: "South Korea", Language: "Korean", Weather: "Cold", Currency: "Won", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Seoul&tbm=isch" },
  { id: "14", City: "Amsterdam", Country: "Netherlands", Language: "Dutch", Weather: "Mild", Currency: "Euro", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Amsterdam&tbm=isch" },
  { id: "15", City: "Madrid", Country: "Spain", Language: "Spanish", Weather: "Hot", Currency: "Euro", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Madrid&tbm=isch" },
  { id: "16", City: "Lisbon", Country: "Portugal", Language: "Portuguese", Weather: "Warm", Currency: "Euro", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Lisbon&tbm=isch" },
  { id: "17", City: "Los Angeles", Country: "USA", Language: "English", Weather: "Hot", Currency: "USD", Cost: "High", Pictures: "https://www.google.com/search?q=Los+Angeles&tbm=isch" },
  { id: "18", City: "Barcelona", Country: "Spain", Language: "Spanish", Weather: "Mild", Currency: "Euro", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Barcelona&tbm=isch" },
  { id: "19", City: "San Francisco", Country: "USA", Language: "English", Weather: "Mild", Currency: "USD", Cost: "High", Pictures: "https://www.google.com/search?q=San+Francisco&tbm=isch" },
  { id: "20", City: "Hong Kong", Country: "China", Language: "Cantonese", Weather: "Tropical", Currency: "HKD", Cost: "High", Pictures: "https://www.google.com/search?q=Hong+Kong&tbm=isch" },
  { id: "21", City: "Buenos Aires", Country: "Argentina", Language: "Spanish", Weather: "Warm", Currency: "Peso", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Buenos+Aires&tbm=isch" },
  { id: "22", City: "Cairo", Country: "Egypt", Language: "Arabic", Weather: "Hot", Currency: "Pound", Cost: "Low", Pictures: "https://www.google.com/search?q=Cairo&tbm=isch" },
  { id: "23", City: "Singapore", Country: "Singapore", Language: "English", Weather: "Tropical", Currency: "SGD", Cost: "High", Pictures: "https://www.google.com/search?q=Singapore&tbm=isch" },
  { id: "24", City: "Istanbul", Country: "Turkey", Language: "Turkish", Weather: "Mild", Currency: "Lira", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Istanbul&tbm=isch" },
  { id: "25", City: "Lagos", Country: "Nigeria", Language: "English", Weather: "Tropical", Currency: "Naira", Cost: "Low", Pictures: "https://www.google.com/search?q=Lagos&tbm=isch" },
  { id: "26", City: "Mexico City", Country: "Mexico", Language: "Spanish", Weather: "Tropical", Currency: "Peso", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Mexico+City&tbm=isch" },
  { id: "27", City: "Vancouver", Country: "Canada", Language: "English", Weather: "Cold", Currency: "CAD", Cost: "High", Pictures: "https://www.google.com/search?q=Vancouver&tbm=isch" },
  { id: "28", City: "Stockholm", Country: "Sweden", Language: "Swedish", Weather: "Cold", Currency: "Krona", Cost: "High", Pictures: "https://www.google.com/search?q=Stockholm&tbm=isch" },
  { id: "29", City: "Athens", Country: "Greece", Language: "Greek", Weather: "Warm", Currency: "Euro", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Athens&tbm=isch" },
  { id: "30", City: "Montreal", Country: "Canada", Language: "French", Weather: "Cold", Currency: "CAD", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Montreal&tbm=isch" },
  { id: "31", City: "Lagos", Country: "Nigeria", Language: "English", Weather: "Tropical", Currency: "Naira", Cost: "Low", Pictures: "https://www.google.com/search?q=Lagos&tbm=isch" },
  { id: "32", City: "Seoul", Country: "South Korea", Language: "Korean", Weather: "Cold", Currency: "Won", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Seoul&tbm=isch" },
  { id: "33", City: "Cairo", Country: "Egypt", Language: "Arabic", Weather: "Hot", Currency: "Pound", Cost: "Low", Pictures: "https://www.google.com/search?q=Cairo&tbm=isch" },
  { id: "34", City: "Kuala Lumpur", Country: "Malaysia", Language: "Malay", Weather: "Tropical", Currency: "MYR", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Kuala+Lumpur&tbm=isch" },
  { id: "35", City: "Hong Kong", Country: "China", Language: "Cantonese", Weather: "Tropical", Currency: "HKD", Cost: "High", Pictures: "https://www.google.com/search?q=Hong+Kong&tbm=isch" },
  { id: "36", City: "Prague", Country: "Czech Republic", Language: "Czech", Weather: "Cold", Currency: "Czech Koruna", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Prague&tbm=isch" },
  { id: "37", City: "Vienna", Country: "Austria", Language: "German", Weather: "Cold", Currency: "Euro", Cost: "High", Pictures: "https://www.google.com/search?q=Vienna&tbm=isch" },
  { id: "38", City: "Edinburgh", Country: "Scotland", Language: "English", Weather: "Rainy", Currency: "Pound", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Edinburgh&tbm=isch" },
  { id: "39", City: "Beijing", Country: "China", Language: "Mandarin", Weather: "Cold", Currency: "Yuan", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Beijing&tbm=isch" },
  { id: "40", City: "Hanoi", Country: "Vietnam", Language: "Vietnamese", Weather: "Tropical", Currency: "Dong", Cost: "Low", Pictures: "https://www.google.com/search?q=Hanoi&tbm=isch" },
  { id: "41", City: "Mumbai", Country: "India", Language: "Hindi", Weather: "Hot", Currency: "Rupee", Cost: "Low", Pictures: "https://www.google.com/search?q=Mumbai&tbm=isch" },
  { id: "42", City: "Buenos Aires", Country: "Argentina", Language: "Spanish", Weather: "Warm", Currency: "Peso", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Buenos+Aires&tbm=isch" },
  { id: "43", City: "Helsinki", Country: "Finland", Language: "Finnish", Weather: "Cold", Currency: "Euro", Cost: "High", Pictures: "https://www.google.com/search?q=Helsinki&tbm=isch" },
  { id: "44", City: "Warsaw", Country: "Poland", Language: "Polish", Weather: "Cold", Currency: "Zloty", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Warsaw&tbm=isch" },
  { id: "45", City: "Oslo", Country: "Norway", Language: "Norwegian", Weather: "Cold", Currency: "Norwegian Krone", Cost: "High", Pictures: "https://www.google.com/search?q=Oslo&tbm=isch" },
  { id: "46", City: "Jakarta", Country: "Indonesia", Language: "Indonesian", Weather: "Hot", Currency: "Rupiah", Cost: "Low", Pictures: "https://www.google.com/search?q=Jakarta&tbm=isch" },
  { id: "47", City: "Cape Town", Country: "South Africa", Language: "Afrikaans", Weather: "Mild", Currency: "Rand", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Cape+Town&tbm=isch" },
  { id: "48", City: "Manila", Country: "Philippines", Language: "Filipino", Weather: "Hot", Currency: "Peso", Cost: "Low", Pictures: "https://www.google.com/search?q=Manila&tbm=isch" },
  { id: "49", City: "Reykjavik", Country: "Iceland", Language: "Icelandic", Weather: "Cold", Currency: "Krona", Cost: "High", Pictures: "https://www.google.com/search?q=Reykjavik&tbm=isch" },
  { id: "50", City: "Dublin", Country: "Ireland", Language: "English", Weather: "Rainy", Currency: "Euro", Cost: "High", Pictures: "https://www.google.com/search?q=Dublin&tbm=isch" },
  { id: "51", City: "Auckland", Country: "New Zealand", Language: "English", Weather: "Mild", Currency: "NZD", Cost: "High", Pictures: "https://www.google.com/search?q=Auckland&tbm=isch" },
  { id: "52", City: "Zagreb", Country: "Croatia", Language: "Croatian", Weather: "Cold", Currency: "Euro", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Zagreb&tbm=isch" },
  { id: "53", City: "Bogotá", Country: "Colombia", Language: "Spanish", Weather: "Tropical", Currency: "Peso", Cost: "Low", Pictures: "https://www.google.com/search?q=Bogotá&tbm=isch" },
  { id: "54", City: "Johannesburg", Country: "South Africa", Language: "English", Weather: "Mild", Currency: "Rand", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Johannesburg&tbm=isch" },
  { id: "55", City: "Doha", Country: "Qatar", Language: "Arabic", Weather: "Hot", Currency: "Riyal", Cost: "High", Pictures: "https://www.google.com/search?q=Doha&tbm=isch" },
  { id: "56", City: "Casablanca", Country: "Morocco", Language: "Arabic", Weather: "Warm", Currency: "Dirham", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Casablanca&tbm=isch" },
  { id: "57", City: "Kyoto", Country: "Japan", Language: "Japanese", Weather: "Temperate", Currency: "Yen", Cost: "High", Pictures: "https://www.google.com/search?q=Kyoto&tbm=isch" },
  { id: "58", City: "Florence", Country: "Italy", Language: "Italian", Weather: "Warm", Currency: "Euro", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Florence&tbm=isch" },
  { id: "59", City: "Quebec City", Country: "Canada", Language: "French", Weather: "Cold", Currency: "CAD", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Quebec+City&tbm=isch" },
  { id: "60", City: "Marrakech", Country: "Morocco", Language: "Arabic", Weather: "Hot", Currency: "Dirham", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Marrakech&tbm=isch" },
  { id: "61", City: "Seville", Country: "Spain", Language: "Spanish", Weather: "Hot", Currency: "Euro", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Seville&tbm=isch" },
  { id: "62", City: "Luxor", Country: "Egypt", Language: "Arabic", Weather: "Hot", Currency: "Pound", Cost: "Low", Pictures: "https://www.google.com/search?q=Luxor&tbm=isch" },
  { id: "63", City: "Kyiv", Country: "Ukraine", Language: "Ukrainian", Weather: "Cold", Currency: "Hryvnia", Cost: "Low", Pictures: "https://www.google.com/search?q=Kyiv&tbm=isch" },
  { id: "64", City: "Amman", Country: "Jordan", Language: "Arabic", Weather: "Hot", Currency: "Dinar", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Amman&tbm=isch" },
  { id: "65", City: "Valencia", Country: "Spain", Language: "Spanish", Weather: "Warm", Currency: "Euro", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Valencia&tbm=isch" },
  { id: "66", City: "Rio de Janeiro", Country: "Brazil", Language: "Portuguese", Weather: "Tropical", Currency: "Real", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Rio+de+Janeiro&tbm=isch" },
  { id: "67", City: "Phuket", Country: "Thailand", Language: "Thai", Weather: "Tropical", Currency: "Baht", Cost: "Low", Pictures: "https://www.google.com/search?q=Phuket&tbm=isch" },
  { id: "68", City: "Brussels", Country: "Belgium", Language: "Dutch", Weather: "Rainy", Currency: "Euro", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Brussels&tbm=isch" },
  { id: "69", City: "Antwerp", Country: "Belgium", Language: "Dutch", Weather: "Mild", Currency: "Euro", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Antwerp&tbm=isch" },
  { id: "70", City: "Guangzhou", Country: "China", Language: "Mandarin", Weather: "Tropical", Currency: "Yuan", Cost: "Moderate", Pictures: "https://www.google.com/search?q=Guangzhou&tbm=isch" }
];

export function ModalPlaceSuggestion({ onVisitPlaceClicked }: { onVisitPlaceClicked: (city: string) => void }) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <strong className="cursor-pointer">Click here.</strong>
      </DialogTrigger>
      <DialogContent className="max-w-full max-h-screen overflow-auto p-4">
        <DialogHeader>
          <DialogTitle>Place Suggestions</DialogTitle>
          <DialogDescription>
            Find places to add to your travel plan and make the most of your trip.
          </DialogDescription>
        </DialogHeader>
          <PlaceSuggestions onVisitPlaceClicked={onVisitPlaceClicked}/>
      </DialogContent>
    </Dialog>
  )
}

function PlaceSuggestions({ onVisitPlaceClicked }: { onVisitPlaceClicked: (city: string) => void }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedColumn, setSelectedColumn] = React.useState<string>("City");
  
  const columns: ColumnDef<dataPlace, any>[] = [
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
      accessorKey: "Weather",
      header: "Weather",
      cell: ({ row }: any) => <div>{row.getValue("Weather")}</div>,
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
        <a href={row.getValue("Pictures")} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          Link
        </a>
      )
    },
    {
      accessorKey: "Visit",
      header: "Visit",
      cell: ({ row }: any) => (
        <div onClick={() => handleButton(row.getValue("City"))}>
          <MoveRight className="hover:translate-x-1 transition-all"/>
        </div>
      )
    }
  ];

  const updateFilter = (newFilter: { id: string; value: string }) => {
    setColumnFilters([newFilter]);
  };

  const handleButton = (city: string) => {
    onVisitPlaceClicked(city);
  };

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
      <div className="flex items-center py-4 gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="ml-auto">
              {selectedColumn ? selectedColumn : "Select column to filter"} <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {columns.map((col) => (
              col.header != 'Visit' && col.header != 'Pictures' ?
              <DropdownMenuItem
                key={col.id}
                onClick={() => setSelectedColumn(col.accessorKey || col.id)}
              >
                {col.header as React.ReactNode} 
              </DropdownMenuItem> : null
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Input
          placeholder={`Filter by ${selectedColumn}...`}
          value={(table.getColumn(selectedColumn)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            updateFilter({ id: selectedColumn, value: event.target.value })
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