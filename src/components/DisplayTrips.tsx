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



const data: Trip[] = [
  {
      id: '8515805175548993886',
      tripName: 'Trip to Antarctica',
      period: 'Mar 04, 2026 - Mar 16, 2026',
      daysQty: 13,
      placesQty: 4,
      currency: '$', // USD
      budgetAmount: 5000,
      season: 'Low' // Fora do pico de turismo na Antártida (alta é no verão, Dez-Fev)
  },
  {
      id: '3370619451634542461',
      tripName: 'WWWWWWWWWWWWWWW',
      period: 'Jul 05, 2025 - Jul 12, 2025',
      daysQty: 8,
      placesQty: 5,
      currency: 'R$', // BRL
      budgetAmount: 15000,
      season: 'High' // Julho é alta temporada devido a férias escolares no Brasil e Europa
  },
  {
      id: '2309724424561533844',
      tripName: 'Trip to Africa',
      period: 'Dec 26, 2026 - Jan 07, 2027',
      daysQty: 13,
      placesQty: 2,
      currency: '£', // GBP
      budgetAmount: 4000,
      season: 'High' // Festas de fim de ano são alta temporada globalmente
  },
  {
      id: '843957364789331813',
      tripName: 'Trip to South America',
      period: 'Oct 31, 2025 - Nov 04, 2025',
      daysQty: 5,
      placesQty: 4,
      currency: '¥', // JPY
      budgetAmount: 500000,
      season: 'Middle' // Primavera na América do Sul, início de alta temporada em algumas regiões
  },
  {
      id: '7092866250445387125',
      tripName: 'Trip to Africa',
      period: 'Jun 26, 2025 - Jul 08, 2025',
      daysQty: 13,
      placesQty: 5,
      currency: 'A$', // AUD
      budgetAmount: 7000,
      season: 'High' // Junho-Julho são meses populares para safáris na África
  },
  {
      id: '426362703034783719',
      tripName: 'Trip to Antarctica',
      period: 'Jun 15, 2026 - Jun 20, 2026',
      daysQty: 6,
      placesQty: 1,
      currency: '₹', // INR
      budgetAmount: 100000,
      season: 'Low' // Inverno na Antártida, sem turismo significativo
  },
];

export function DisplayTrips() {
  const [selectedRowId, setSelectedRowId] = React.useState<string | null>(null);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Mover a definição de `columns` para dentro do componente
  const columns: ColumnDef<Trip>[] = [
    {
      id: "select",
      cell: ({ row }) => (
        <Checkbox
          checked={row.id === selectedRowId}
          onCheckedChange={(value) => {
            setSelectedRowId(value ? row.id : null);
          }}
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
      header: "Places",
      cell: ({ row }) => <div className="lowercase">{row.getValue("placesQty")} places</div>,
    },
    {
      accessorKey: "currency",
      header: "Currency",
    },
    {
      accessorKey: "budgetAmount",
      header: "Budget",
      cell: ({ row }) => (
        <div className="text-left font-medium">
          {row.getValue("currency")}
          {row.getValue("budgetAmount")}
        </div>
      ),
    },
    {
      accessorKey: "season",
      header: "Season",
      cell: ({ row }) => (
        <div className="text-left font-medium">{row.getValue("season")}</div>
      ),
    },
    {
      id: "options",
      enableHiding: false,
      cell: ({ row }) => (
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
            <DropdownMenuItem>Edit Trip</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete Trip</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Duplicate Trip</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

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
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    header.id != 'currency' ?
                    <TableHead key={header.id} className="bg-color-orange text-white">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead> : ''
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
                  cell.column.id !== 'currency' && (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  )
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
