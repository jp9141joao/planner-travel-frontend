import Credits from "@/components/Credits";
import { GoBack } from "@/components/GoBack";
import { BodyPage, BottomPage, MiddlePageOneCol, TopPage } from "@/components/LayoutPage/Layouts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/toaster";
import { getItemSessionStorage } from "@/components/utils/utils";
import { toast } from "@/hooks/use-toast";
import { deleteExpense, getExpenses } from "@/service/service";
import { AccomodationExpense, AirplaneExpense, AttractionExpense, Expense, FoodExpense, TransportationExpense } from "@/types/types";
import { Bed, BedSingle, Building, Bus, CalendarIcon, Castle, Church, CircleHelp, Clock, Coffee, CookingPot, FerrisWheel, Fish, Flag, Home, Hotel, Landmark, Link, MapPin, MoreHorizontal, Mountain, PawPrint, Pencil, Pizza, Plane, Plus, Puzzle, Receipt, Soup, Theater, Ticket, Timer, TreePine, Users, Utensils, Wallet, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function ViewExpenses() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState<number>(0);
    const [count, setCount] = useState<number>(0);
    //const [expenses, setExpenses] = useState<Expense[]>([]);

    ///*
    const [expenses, setExpenses] = useState<Expense[]>([
        {
            id: '1',
            tripId: '1',
            type: 'food',
            name: 'WWWWWWWWWWWWWWW',
            category: 'Breakfast',
            place: 'WWWWWWWWWWWWWWW',
            price: 42,
            countryCurrency: '$',
            day: 1
        },
        {
            id: '1',
            tripId: '1',
            type: 'attraction',
            name: 'History Museum',
            category: 'Museum',
            duration: '1h',
            price: 42,
            countryCurrency: '$',
            day: 1
        },
        {
            id: '2',
            tripId: '1',
            type: 'transportation',
            category: 'UBER',
            origin: 'Aeroport',
            destination: 'Apartament',
            price: 10,
            countryCurrency: '$',
            day: 2
        },
        {
            id: '2',
            tripId: '1',
            type: 'attraction',
            name: 'Central Park',
            category: 'Park',
            duration: '3h',
            price: 0,
            countryCurrency: '$',
            day: 2
        },
        {
            id: '3',
            tripId: '1',
            type: 'airplane',
            name: 'EMIRATES',
            origin: 'Orlando',
            destination: 'Los Angeles',
            price: 1500,
            countryCurrency: '$',
            day: 5
        },
        {
            id: '3',
            tripId: '1',
            type: 'accomodation',
            name: 'Cozy Apartment',
            category: 'Airbnb',
            duration: '2h',
            price: 250,
            countryCurrency: '$',
            day: 5
        },
        {
            id: '4',
            tripId: '1',
            type: 'accomodation',
            name: 'Beachside Guesthouse',
            category: 'Guesthouse',
            duration: '2h',
            price: 180,
            countryCurrency: '$',
            day: 7
        },
        {
            id: '4',
            tripId: '1',
            type: 'attraction',
            name: 'Broadway Show',
            category: 'Theater',
            duration: '2h',
            price: 85,
            countryCurrency: '$',
            day: 7
        },
        {
            id: '6',
            tripId: '1',
            type: 'attraction',
            name: 'Ocean Aquarium',
            category: 'Aquarium',
            duration: '2.5h',
            price: 30,
            countryCurrency: '$',
            day: 7
        },
        {
            id: '5',
            tripId: '1',
            type: 'attraction',
            name: 'City Zoo',
            category: 'Zoo',
            duration: '4h',
            price: 25,
            countryCurrency: '$',
            day: 9
        },
        {
            id: '9',
            tripId: '1',
            type: 'attraction',
            name: 'Ancient Ruins',
            category: 'Historical Place',
            duration: '3h',
            price: 15,
            countryCurrency: '$',
            day: 9
        },
        {
            id: '1',
            tripId: '1',
            type: 'food',
            name: 'RESTRAUNT',
            category: 'Lunch',
            place: 'Supermarket',
            price: 42,
            countryCurrency: '$',
            day: 9
        },
        {
            id: '1',
            tripId: '1',
            type: 'food',
            name: 'RESTRAUNT',
            category: 'Dinner',
            place: 'Supermarket',
            price: 42,
            countryCurrency: '$',
            day: 8
        },
        {
            id: '10',
            tripId: '1',
            type: 'attraction',
            name: 'Grand Cathedral',
            category: 'Religious Place',
            duration: '1.5h',
            price: 0,
            countryCurrency: '$',
            day: 11
        },
        {
            id: '11',
            tripId: '1',
            type: 'attraction',
            name: 'Mystery Adventure',
            category: 'Others',
            duration: '2h',
            price: 50,
            countryCurrency: '$',
            day: 12
        },
        {
            id: '11',
            tripId: '1',
            type: 'attraction',
            name: 'Apartament House',
            category: 'Airbnb',
            duration: '3 days',
            price: 300,
            countryCurrency: '$',
            day: 12
        },
        {
            id: '7',
            tripId: '1',
            type: 'attraction',
            name: 'Gourmet Restaurant',
            category: 'Restaurant',
            duration: '1.5h',
            price: 75,
            countryCurrency: '$',
            day: 12
        },
        {
            id: '8',
            tripId: '1',
            type: 'attraction',
            name: 'National Park',
            category: 'Nature Place',
            duration: '6h',
            price: 20,
            countryCurrency: '$',
            day: 12
        },
        {
            id: '1',
            tripId: '1',
            type: 'airplane',
            name: 'LATAM',
            origin: 'São Paulo',
            destination: 'Orlando',
            price: 1500,
            countryCurrency: '$',
            day: 12
        },
        {
            id: '1',
            tripId: '1',
            type: 'food',
            name: 'RESTRAUNT',
            category: 'Breakfast',
            place: 'Supermarket',
            price: 42,
            countryCurrency: '$',
            day: 10
        },
        {
            id: '3',
            tripId: '1',
            type: 'accomodation',
            name: 'Luxury Hotel',
            category: 'Hotel',
            duration: '2h',
            price: 500,
            countryCurrency: '$',
            day: 12
        },
        {
            id: '2',
            tripId: '1',
            type: 'accomodation',
            name: 'Youth Hostel',
            category: 'Hostel',
            duration: '2h',
            price: 100,
            countryCurrency: '$',
            day: 2
        },
        {
            id: '5',
            tripId: '1',
            type: 'accomodation',
            name: 'Mansion',
            category: 'Other',
            duration: '2h',
            price: 1500,
            countryCurrency: '$',
            day: 10
        },
        {
            id: '1',
            tripId: '1',
            type: 'food',
            name: 'RESTRAUNT',
            category: 'Snack',
            place: 'Supermarket',
            price: 42,
            countryCurrency: '$',
            day: 1
        }
    ]);
    //*/
    const [show, setShow] = useState<boolean | null>(true);
    const data = [
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

    const loadExpenses = async () => {
        try {
            const tripId: string | null = getItemSessionStorage('tripId');

            if (!tripId) {
                throw new Error("Trip ID is missing")
            }

            const response = await getExpenses(tripId as string);
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
            console.error(error);
        }
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
                    <div className="w-full grid gap-y-3 mt-[5vw] xs:mt-[2.6vw] xxs5:mt-[4.3vw] lg:mt-[0.7vw]" >
                    {
                        show == true ?
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
                        </div> : null
                    }
                    <div className={`${show == false ? 'hidden' : ''} w-full`}>
                        <Button 
                            className={`w-full gap-2 flex justify-center ${show == true ? '' : ''}`} 
                            onClick={()=> {
                            show == true ? setShow(null) : setShow(true)}
                        }>
                            {
                                show == true ?
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
                        show == false ?
                        <>
                            <div>
                                <Label className="ml-1">Select the expanse type: </Label>
                                <Carousel opts={{align: "start" }} setApi={setApi} className="w-[87.8vw] xs:w-[61.5vw] lg:w-[24.73vw]">
                                    <CarouselContent className="w-full items-center -ml-1 lg:ml-0.4 ">
                                        {data.map((obj, index) => (
                                        <CarouselItem key={index} className="pl-1.5 basis-1/2 cursor-pointer">
                                            <div className="w-full flex">
                                                <Button 
                                                    variant={'outline'} 
                                                    className="w-full gap-2">
                                                        {obj.icon}
                                                        {obj.name}
                                                </Button>                
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
                    <div className={`${show == true ? 'hidden' : ''} w-full grid `}>
                        <Button
                            size={'auto'} variant={`${show == false ? 'default' : 'outline'}`} 
                            className="gap-1 flex justify-center " 
                            onClick={()=> {
                                show == false ? setShow(null) : setShow(false)}
                        }>
                            {
                                show == false ?
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