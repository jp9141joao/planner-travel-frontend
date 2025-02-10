import Credits from "@/components/Credits";
import { GoBack } from "@/components/GoBack";
import { BodyPage, BottomPage, MiddlePageOneCol, TopPage } from "@/components/LayoutPage/Layouts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toaster } from "@/components/ui/toaster";
import { getItemSessionStorage } from "@/components/utils/utils";
import { toast } from "@/hooks/use-toast";
import { deleteExpense, getExpenses, getTrip } from "@/service/service";
import { AccomodationExpense, AirplaneExpense, AttractionExpense, dataButton, dataForm, Expense, FoodExpense, TransportationExpense, Trip } from "@/types/types";
import { Bed, BedSingle, Building, Bus, CalendarIcon, Castle, ChevronDown, ChevronUp, Church, CircleHelp, Clock, Coffee, CookingPot, FerrisWheel, Fish, Flag, Home, Hotel, Landmark, Link, MapPin, MoreHorizontal, Mountain, PawPrint, Pencil, Pizza, Plane, Plus, Puzzle, Receipt, Soup, Theater, Ticket, Timer, TreePine, Users, Utensils, Wallet, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function ViewExpenses() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState<number>(0);
    const [count, setCount] = useState<number>(0);
    const [trip, setTrip] = useState<Trip>();
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [showContent, setShowContent] = useState<boolean | null>(null);
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const dataButton: dataButton[] = [
        {
            name: 'Airplane',
            href: '/expenses',
            nmr: 0,
            icon: <Plane />
        },
        {
            name: 'Transport',
            href: '/itinerary',
            nmr: 1,
            icon: <Bus />
        },
        {
            name: 'Food',
            href: '/toDoList',
            nmr: 2,
            icon: <Utensils />
        },
        {
            name: 'Attraction',
            href: '/toDoList',
            nmr: 3,
            icon: <FerrisWheel />
        },
        {
            name: 'Accomodation',
            href: '/myPiggyBank',
            nmr: 4,
            icon: <Hotel />
        },
    ];
    const dataForm: dataForm[] = [
        {
            operation: '',
            type: '',
            title: '',
            subtitle: '',
            content: [
                { 
                    id: '', 
                    label: '',  
                    element: '', 
                    typeElement: '', 
                    placeHolderElement: '', 
                    valueElement: '' 
                }
            ]
        }
    ]

    const loadTrip = async () => {
        try {
            const route: string | null = getItemSessionStorage('route');
            const tripId: string | null = getItemSessionStorage('tripId');

            if (!route) {
                throw new Error("Route is missing")
            }

            if (!tripId) {
                throw new Error("Trip ID is missing")
            }

            const response = await getTrip(route as string, tripId as string);

            if (response.success) {
                setTrip(response.data);
            } else {
                toast({
                    variant: 'destructive',
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                });
            }
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
            console.error(error);
        }
    }

    const loadExpenses = async () => {
        try {
            if (trip) {
                const response = await getExpenses(trip.id as string);

                if (response.success) {
                    setExpenses(response.data)
                } else {
                    toast({
                        variant: 'destructive',
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with your request.",
                    });
                }
            } else {
                toast({
                    variant: 'destructive',
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                });
            }
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
            console.error(error);
        }
    }

    const handleCreate = async () => {

    }

    const handleUpdate = async () => {

    }

    const handleDelete = async (expenseId: string) => {
        try {
            const tripId: string | null = getItemSessionStorage('tripId');

            if (!tripId) {
                throw new Error("Trip ID is missing")
            }

            const response = await deleteExpense(tripId as string, expenseId as string);

            if (response.success) {
                
            } else {
                toast({
                    variant: 'destructive',
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                });
            }
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
            console.error(error);
        }
    }

    useEffect(() => {
        if (showContent == true || showContent == false) {
            setShowDetails(false);
        }
    }, [showContent])

    useEffect(() => {
        if (!api) {
            return;
        }
        
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)
        
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api]);

    useEffect(() => {
        //loadExpenses();
    }, [trip]);
    
    useEffect(() => {
        //loadTrip();
    }, []);

    return (
        <BodyPage>
            <TopPage>
                <GoBack to={'selectTrip'} />
            </TopPage>
            <MiddlePageOneCol>
                <div className="grid place-items-center items-center" >
                    <div>
                        <h1 className="grid text-[14.6vw] xxs5:text-[14.1vw] xs:text-[12vw] lg:text-[4.6vw] w-full text-gray-900 tracking-tight leading-[0.6] xxs3:leading-[0.7]">
                            Trip Expenses
                        </h1>
                    </div>
                    <div>
                        <p  className="text-[7.1vw] xxs8:text-[6.7vw] xs:text-[5.8vw] lg:text-[1.68vw] mt-[3.7vw] xxs5:mt-[4.9vw] xxs3:mt-[5.2vw] xs:mt-[3.7vw] lg:mt-[1.1vw] leading-tight text-gray-900 tracking-tight">
                            Track your trip, stay on budget!
                        </p>
                    </div>
                    <div className="">
                        
                    </div>
                    <div className="w-full grid gap-y-3 mt-[5vw] xs:mt-[2.6vw] xxs5:mt-[4.3vw] lg:mt-[0.7vw]" >
                        {
                            showContent == true ?
                            expenses.length > 0 ?
                            <div className="w-full">
                                <ScrollArea className={`grid -mr-10 ${expenses.length < 4 ? 'h-auto' : 'h-[92vw] xxs5:h-[68vw] xs:h-[48vw] md:h-[33.5vw] lg:h-[18.6vw]' } w-[96vw] xxs10:w-[96.5vw] xxs8:w-[90.7vw] xxs5:w-[90.1vw] xxs2:w-[89.5vw] xs:w-[77vw] md:w-[76.3vw] lg:w-[26.4vw] mt-[1vw]`}>
                                    <div className="relative">
                                        {
                                            expenses.map((obj: any, index: number) => (
                                                <Card key={index} className={`px-2 py-1 ${index != 0 && index != expenses.length - 1 ? 'my-3' : null} mr-3`}>
                                                    <div className="flex justify-between items-center m-0 p-0">
                                                        {
                                                            obj.type == "airplane" ?
                                                            <>
                                                                <Plane strokeWidth={1.5} className="w-10 xxs5:w-12 xxs5:w-13 h-auto pr-2 lg:pr-0 lg:mr-3"/>
                                                                <div className="w-full grid place-items-start xxs5:gap-0.5 lg:gap-1">
                                                                    <p className="break-all text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                        <strong>
                                                                            { obj.name }
                                                                        </strong>
                                                                    </p>
                                                                    <p className="flex gap-0.5 xs:gap-1 text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                        <MapPin className="w-3 lg:w-5 h-auto"/>
                                                                        { obj.origin }
                                                                    </p>
                                                                    <p className="flex gap-0.5 xs:gap-1 text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                        <Flag className="w-3 lg:w-5 h-auto"/>
                                                                        { obj.destination }
                                                                    </p>
                                                                    <div className="w-full grid xxs5:flex justify-between pr-2">
                                                                        <div className="flex gap-1.5">
                                                                            <Wallet className="w-3 lg:w-5 h-auto"/>
                                                                            <p className="break-all text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                                { obj.countryCurrency }{ obj.price }
                                                                            </p>
                                                                        </div>
                                                                        <div className="flex gap-0.5 xs:gap-1"><CalendarIcon className="w-3 lg:w-5 h-auto"/>
                                                                            <p className="text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                                Day { obj.day }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </> : 
                                                            obj.type == "transportation" ?
                                                            <>
                                                                <Bus strokeWidth={1.5} className="w-10 xxs5:w-12 xxs5:w-13 h-auto pr-2 lg:pr-0 lg:mr-3"/>
                                                                <div className="w-full grid place-items-start xxs5:gap-0.5 lg:gap-1 text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                    <p className="break-all">
                                                                        <strong>
                                                                            { obj.category }
                                                                        </strong>
                                                                    </p>
                                                                    <p className="flex gap-0.5 xs:gap-1 text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                        <MapPin className="w-3 lg:w-5 h-auto"/>
                                                                        { obj.origin }
                                                                    </p>
                                                                    <p className="flex gap-0.5 xs:gap-1 text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                        <Flag className="w-3 lg:w-5 h-auto"/>
                                                                        { obj.destination }
                                                                    </p>
                                                                    <div className="w-full grid xxs5:flex justify-between pr-2">
                                                                        <div className="flex gap-1.5">
                                                                            <Wallet className="w-3 lg:w-5 h-auto"/>
                                                                            <p className="break-all text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                                { obj.countryCurrency }{ obj.price }
                                                                            </p>
                                                                        </div>
                                                                        <div className="flex gap-0.5 xs:gap-1">
                                                                            <CalendarIcon className="w-3 lg:w-5 h-auto"/>
                                                                            <p className="text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                                Day { obj.day }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </> :
                                                            obj.type == "food" ?
                                                            <>
                                                                <Utensils strokeWidth={1.5} className="w-10 xxs5:w-12 xxs5:w-13 h-auto pr-2 lg:pr-0 lg:mr-3"/>
                                                                <div className="w-full grid place-items-start xxs5:gap-0.5 lg:gap-1 text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                    <p className="break-all">
                                                                        <strong>
                                                                            { obj.name }
                                                                        </strong>
                                                                    </p>
                                                                    <div className="flex gap-0.5 xs:gap-1">
                                                                        { obj.category == 'Breakfast' ?
                                                                        <Coffee className="w-3 lg:w-5 h-auto"/> :
                                                                        obj.category == 'Snack' ?
                                                                        <Pizza className="w-3 lg:w-5 h-auto"/>  :
                                                                        obj.category == 'Lunch' ?
                                                                        <CookingPot className="w-3 lg:w-5 h-auto"/>  :
                                                                        obj.category == 'Dinner' ?
                                                                        <Soup className="w-3 lg:w-5 h-auto"/>  : null
                                                                        } 
                                                                        <p className="break-all">
                                                                            { obj.category }
                                                                        </p>
                                                                    </div>
                                                                    <p className="flex gap-0.5 xs:gap-1 text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                        <MapPin className="w-3 lg:w-5 h-auto"/>
                                                                        { obj.place }
                                                                    </p> 
                                                                    <div className="w-full grid xxs5:flex justify-between pr-2">
                                                                        <div className="flex gap-1.5">
                                                                            <Wallet className="w-3 lg:w-5 h-auto"/>
                                                                            <p className="break-all text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                                { obj.countryCurrency }{ obj.price }
                                                                            </p>
                                                                        </div>
                                                                        <div className="flex gap-0.5 xs:gap-1">
                                                                            <CalendarIcon className="w-3 lg:w-5 h-auto"/>
                                                                            <p className="text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                                Day { obj.day }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </> : 
                                                            obj.type == "attraction" ?
                                                            <>
                                                                <FerrisWheel strokeWidth={1.5} className="w-10 xxs5:w-12 xxs5:w-13 h-auto pr-2 lg:pr-0 lg:mr-3"/>
                                                                <div className="w-full grid place-items-start xxs5:gap-0.5 lg:gap-1 text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                    <p className="break-all">
                                                                        <strong>
                                                                            { obj.name }
                                                                        </strong>
                                                                    </p>
                                                                    <div className="flex gap-0.5 xs:gap-1">
                                                                        { obj.category == 'Museum' ? 
                                                                        <Landmark className="w-3 lg:w-5 h-auto" /> :
                                                                        obj.category == 'Park' ? 
                                                                        <TreePine className="w-3 lg:w-5 h-auto" /> :
                                                                        obj.category == 'Event' ? 
                                                                        <Ticket className="w-3 lg:w-5 h-auto" /> :
                                                                        obj.category == 'Theater' ? 
                                                                        <Theater className="w-3 lg:w-5 h-auto" /> :
                                                                        obj.category == 'Zoo' ? 
                                                                        <PawPrint className="w-3 lg:w-5 h-auto" /> :
                                                                        obj.category == 'Aquarium' ? 
                                                                        <Fish className="w-3 lg:w-5 h-auto" /> :
                                                                        obj.category == 'Restaurant' ? 
                                                                        <Utensils className="w-3 lg:w-5 h-auto" /> :
                                                                        obj.category == 'Nature Place' ? 
                                                                        <Mountain className="w-3 lg:w-5 h-auto" /> :
                                                                        obj.category == 'Historical Place' ? 
                                                                        <Castle className="w-3 lg:w-5 h-auto" /> :
                                                                        obj.category == 'Religious Place' ? 
                                                                        <Church className="w-3 lg:w-5 h-auto" /> :
                                                                        obj.category == 'Others' ? 
                                                                        <Puzzle className="w-3 lg:w-5 h-auto" /> : null 
                                                                        }
                                                                        <p className="break-all">
                                                                            { obj.category }
                                                                        </p>
                                                                    </div>
                                                                    <p className="flex gap-0.5 xs:gap-1 text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                        <Timer className="w-3 lg:w-5 h-auto"/>
                                                                        { obj.duration }
                                                                    </p>
                                                                    <div className="w-full grid xxs5:flex justify-between pr-2">
                                                                        <div className="flex gap-1.5">
                                                                            <Wallet className="w-3 lg:w-5 h-auto"/>
                                                                            <p className="break-all text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                                { obj.countryCurrency }{ obj.price }
                                                                            </p>
                                                                        </div>
                                                                        <div className="flex gap-0.5 xs:gap-1">
                                                                            <CalendarIcon className="w-3 lg:w-5 h-auto"/>
                                                                            <p className="text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                                Day { obj.day }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </> : 
                                                            obj.type == "accomodation" ?
                                                            <>
                                                                <Hotel strokeWidth={1.5} className="w-10 xxs5:w-12 xxs5:w-13 h-auto pr-2 lg:pr-0 lg:mr-3"/>
                                                                <div className="w-full grid place-items-start xxs5:gap-0.5 lg:gap-1 text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                    <p className="break-all">
                                                                        <strong>
                                                                            { obj.name }
                                                                        </strong>
                                                                    </p>
                                                                    <div className="flex gap-0.5 xs:gap-1">
                                                                        { obj.category == 'Hotel' ?  
                                                                        <Bed className="w-3 lg:w-5 h-auto"/> :  
                                                                        obj.category == 'Hostel' ?  
                                                                        <Users className="w-3 lg:w-5 h-auto"/>  :  
                                                                        obj.category == 'Airbnb' ?  
                                                                        <Home className="w-3 lg:w-5 h-auto"/>  :  
                                                                        obj.category == 'Guesthouse' ?  
                                                                        <Building className="w-3 lg:w-5 h-auto"/>  :  
                                                                        obj.category == 'Other' ?  
                                                                        <BedSingle className="w-3 lg:w-5 h-auto"/>  : null  
                                                                        }  
                                                                        <p className="break-all">
                                                                            { obj.category }
                                                                        </p>
                                                                    </div>
                                                                    <p className="flex gap-0.5 xs:gap-1 text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                        <Clock className="w-3 lg:w-5 h-auto"/>
                                                                        { obj.duration } Days
                                                                    </p>
                                                                    <div className="w-full grid xxs5:flex justify-between pr-2">
                                                                        <div className="flex gap-1.5">
                                                                            <Wallet className="w-3 lg:w-5 h-auto"/>
                                                                            <p className="break-all text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                                { obj.countryCurrency }{ obj.price }
                                                                            </p>
                                                                        </div>
                                                                        <div className="flex gap-0.5 xs:gap-1">
                                                                            <CalendarIcon className="w-3 lg:w-5 h-auto"/>
                                                                            <p className="text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                                Day { obj.day }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </> : null
                                                        }
                                                        <div className="grid xxs5:flex justify-center gap-1.5">
                                                            <Button variant={'outline'} className="w-6 h-6 xxs5:w-8 xxs5:h-8 lg:w-9 lg:h-9 p-0">
                                                                <Pencil className="w-3 xxs5:w-4 lg:w-5 h-auto p-0"/>
                                                            </Button>
                                                            <Button className="w-6 h-6 xxs5:w-8 xxs5:h-8 lg:w-9 lg:h-9 p-0" onClick={() => handleDelete(obj.id)}>
                                                                <X className="w-3 xxs5:w-4 lg:w-5 h-auto p-0"/>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))
                                        }
                                    </div>
                                </ScrollArea>
                            </div> : 
                            <div>
                                <Card className="grid place-items-center p-5">
                                    <p>
                                        You do not have expenses yet on this trip.    
                                    </p>         
                                </Card>
                            </div> : null
                        }
                        <div className={`${showContent == false ? 'hidden' : ''} w-full`}>
                            <Button 
                                className={`w-full gap-2 flex justify-center ${showContent == true ? '' : ''}`} 
                                onClick={()=> {
                                    showContent == true ? setShowContent(null) : setShowContent(true)
                                }
                            }>
                                {
                                    showContent == true ?
                                    <>
                                        <X />
                                        Close
                                    </>
                                    :
                                    <>
                                        <Receipt />
                                        Show expanses
                                    </>
                                }
                            </Button>
                        </div>
                        {
                            showContent == false ?
                            <>
                                <div>
                                    <Label className="ml-1">Select the expanse type: </Label>
                                    <Carousel opts={{align: "start" }} setApi={setApi} className="w-[87.8vw] xs:w-[61.5vw] lg:w-[24.73vw]">
                                        <CarouselContent className="w-full items-center -ml-1 lg:ml-0.4 ">
                                            {dataButton.map((obj, index) => (
                                            <CarouselItem key={index} className="pl-1.5 basis-1/2 cursor-pointer">
                                                <div className="w-full flex">
                                                    {/*<Button 
                                                        variant={'outline'} 
                                                        className="w-full gap-2">
                                                            {obj.icon}
                                                            {obj.name}
                                                    </Button> */}
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button 
                                                            type="button"
                                                            variant={(current == 1 && obj.name == 'Expenses') || 
                                                                (current == 2 && obj.name == 'Itinerary') ||
                                                                (current == 3 && obj.name == 'To Do List')
                                                                ? 'default' : 'outline'}
                                                            >
                                                                {obj.icon}
                                                                {obj.name}
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[425px]">
                                                            <DialogHeader>
                                                            <DialogTitle>{dataForm[index].title}</DialogTitle>
                                                            <DialogDescription>
                                                                {dataForm[index].subtitle}
                                                            </DialogDescription>
                                                            </DialogHeader>
                                                                <form className="grid gap-4 py-4" 
                                                                    onSubmit={() => dataForm[index].operation == 'Create' ? handleCreate() : handleUpdate()}
                                                                >
                                                                    {
                                                                        dataForm[index].content.map((c: any) => (
                                                                            <>
                                                                                <Label htmlFor={c.id}>
                                                                                    {c.label}
                                                                                </Label>
                                                                                {
                                                                                    c.element == 'input' ?
                                                                                    <Input 
                                                                                        type={c.elementType}
                                                                                        placeholder={c.placeHolderElement}
                                                                                    /> :
                                                                                    <Select>
                                                                                        <SelectTrigger className="w-[180px]">
                                                                                            <SelectValue placeholder="Select a fruit" />
                                                                                        </SelectTrigger>
                                                                                        <SelectContent>
                                                                                            <SelectGroup>
                                                                                                {
                                                                                                    c.valueElement.map((v: any) => {
                                                                                                        <SelectItem value={v}>{v}</SelectItem>
                                                                                                    })
                                                                                                }
                                                                                            </SelectGroup>
                                                                                        </SelectContent>
                                                                                    </Select>
                                                                                }
                                                                            </>
                                                                        ))
                                                                    }
                                                                </form>
                                                            <DialogFooter>
                                                                <Button type="submit">
                                                                    {
                                                                        dataForm[0].operation == 'Create' ?
                                                                        `Create ${dataForm[index].type} Expense` :
                                                                        `Change ${dataForm[index].type} Expense`
                                                                    }</Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>            
                                                </div>
                                            </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                    </Carousel>
                                </div> 
                                <div className="flex justify-center">
                                    {Array.from({ length: count }).map((_, index) => (
                                        <span
                                            key={index}
                                            className={`mx-1 w-3 h-3 rounded-full cursor-pointer ${
                                            index + 1 === current ? 'bg-color-orange' : 'bg-[#bfbfbf]'
                                            }`}
                                            onClick={() => api && api.scrollTo(index)}
                                        />
                                    ))}
                                </div> 
                            </>      
                            : null
                        }
                        <div className={`${showContent == true ? 'hidden' : ''} w-full grid `}>
                            <Button
                                size={'auto'} variant={`${showContent == false ? 'default' : 'outline'}`} 
                                className="gap-1 flex justify-center " 
                                onClick={()=> {
                                    showContent == false ? setShowContent(null) : setShowContent(false)}
                            }>
                                {
                                    showContent == false ?
                                    <>
                                        <X />
                                        Close
                                    </>
                                    :
                                    <>
                                        <Plus />
                                        Create expanse
                                    </>
                                }
                            </Button>
                        </div>
                        {
                            showDetails && showContent == null? 
                            <div className="transition-all">
                                <div className="flex gap-2 text-[0.7vw]">
                                    <strong>Trip Name:</strong> Trip to Rio de Janeiro
                                </div>
                                <div className="flex gap-2 text-[0.7vw]">
                                    <strong>Period:</strong> 23 Jan, 2023 - 31 Fev, 2024
                                </div>
                            </div> : null
                        }
                        {
                            showContent == null ?
                            <div className="w-full flex justify-center gap-1 text-lg">
                                {
                                    showDetails ? 
                                    <ChevronUp /> :
                                    <ChevronDown/>
                                }
                                <strong onClick={() => setShowDetails(!showDetails)}>
                                    {showDetails ? 'Hide' : 'Show'} trip details.
                                </strong>
                            </div> : null
                        }
                        <Toaster />
                    </div>  
                </div>
            </MiddlePageOneCol>
            <BottomPage>
                <Credits />
            </BottomPage>
        </BodyPage>
    )
}