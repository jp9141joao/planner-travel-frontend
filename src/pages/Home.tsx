import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import Credits from '@/components/Credits';
import { BodyPage, BottomPage, MiddlePage, TopPage } from "@/components/LayoutPage/Layouts";
import Image from '../assets/undraw_travelers_re_y25a.svg';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <BodyPage>
        <TopPage>
            <NavBar/>
        </TopPage>
        <MiddlePage>
            <div className='text-center xs:text-start lg:place-items-start mx-[8.8vw] lg:mx-0 mt-[6vw] xs:mt-[14vw] lg:mt-0'>
                <div>
                    <h1 className="grid text-[14vw] xxs5:text-[13.7vw] xs:text-[10.5vw] lg:text-[7vw] w-full text-gray-900 tracking-tight leading-[1]">
                        Let's planning your trip!
                    </h1>
                </div>
                <div>
                    <p className='xs:text-start text-[5.2vw] xxs8:text-[4.4vw] xs:text-[3.0vw] lg:text-[1.8vw] mt-[4.5vw] xxs5:mt-[4.2vw] xs:mt-[2.8vw] lg:mt-[1.9vw] leading-tight text-gray-900 tracking-tight'>
                      Explore, organize, and embark on a unique adventure with ease.
                    </p>
                </div>
                <div className="grid xs:flex xs:justify-start xxs11:gap-y-3 xs:gap-y-0 xs:gap-4 mt-[3vw] xs:mt-[1.4vw] lg:mt-[0.8vw]">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size={"auto"}>
                          Place suggestions
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Place Suggestions</DialogTitle>
                          <DialogDescription>
                            Find places to add to your travel plan and make the most of your trip.
                          </DialogDescription>
                        </DialogHeader>
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
                        <DialogFooter>
                          <Button size={"auto"}>Go to this place</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button size={"auto"} variant={"outline"}>
                      I know where to go
                    </Button>
                </div>
            </div>
            <div className="mx-[8.8vw] mt-[6vw] xs:mx-[15.5vw] xs:my-[7vw] lg:my-0 lg:mt-[7.4vw] lg:mx-[2vw]">
              <img
                src={Image}
                className="w-full h-auto"
              />
            </div>
        </MiddlePage>
        <BottomPage>
          <Credits/>
        </BottomPage>
    </BodyPage>
  )
}



{
  /*
  <Carousel className="w-full max-w-xs">
                            <CarouselContent>
                              {Array.from({ length: 5 }).map((_, index) => (
                                <CarouselItem key={index}>
                                  <div className="p-1">
                                    <Card>
                                      <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">{index + 1}</span>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                              <CarouselPrevious />
                            <CarouselNext />
                          </Carousel>
  */
}