import Credits from "@/components/Credits";
import { GoBack } from "@/components/GoBack";
import { BodyPage, BottomPage, MiddlePageOneCol, TopPage } from "@/components/LayoutPage/Layouts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getRoute } from "@/components/utils/utils";
import { AccomodationExpense, AirplaneExpense, AttractionExpense, FoodExpense, TransportationExpense } from "@/service/api";
import { Bed, BedSingle, Building, Bus, CalendarIcon, Castle, Church, CircleHelp, Clock, Coffee, CookingPot, FerrisWheel, Fish, Flag, Home, Hotel, Landmark, Link, MapPin, MoreHorizontal, Mountain, PawPrint, Pencil, Pizza, Plane, Plus, Puzzle, Receipt, Soup, Theater, Ticket, Timer, TreePine, Users, Utensils, Wallet, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function ViewExpenses() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState<number>(0);
    const [count, setCount] = useState<number>(0);
    const [expenses, setExpenses] = useState<(AirplaneExpense | TransportationExpense | FoodExpense | AttractionExpense | AccomodationExpense)[]>([
        {
            id: '1',
            expense: 'food',
            name: 'RESTRAUNT',
            type: 'Snack',
            origin: 'Home',
            destination: 'Supermarket',
            price: 42,
            countryCurrency: '$',
            day: 1
        },
        {
            id: '1',
            expense: 'attraction',
            name: 'History Museum',
            type: 'Museum',
            duration: '1h',
            price: 42,
            countryCurrency: '$',
            day: 1
        },
        {
            id: '2',
            expense: 'transportation',
            type: 'UBER',
            origin: 'Aeroport',
            destination: 'Apartament',
            price: 10,
            countryCurrency: '$',
            day: 2
        },
        {
            id: '2',
            expense: 'attraction',
            name: 'Central Park',
            type: 'Park',
            duration: '3h',
            price: 0,
            countryCurrency: '$',
            day: 2
        },
        {
            id: '3',
            expense: 'airplane',
            airline: 'EMIRATES',
            origin: 'Orlando',
            destination: 'Los Angeles',
            price: 1500,
            countryCurrency: '$',
            day: 5
        },
        {
            id: '3',
            expense: 'accomodation',
            name: 'Cozy Apartment',
            type: 'Airbnb',
            duration: 4,
            price: 250,
            countryCurrency: '$',
            day: 5
        },
        {
            id: '4',
            expense: 'accomodation',
            name: 'Beachside Guesthouse',
            type: 'Guesthouse',
            duration: 3,
            price: 180,
            countryCurrency: '$',
            day: 7
        },
        {
            id: '4',
            expense: 'attraction',
            name: 'Broadway Show',
            type: 'Theater',
            duration: '2h',
            price: 85,
            countryCurrency: '$',
            day: 7
        },
        {
            id: '6',
            expense: 'attraction',
            name: 'Ocean Aquarium',
            type: 'Aquarium',
            duration: '2.5h',
            price: 30,
            countryCurrency: '$',
            day: 7
        },
        {
            id: '5',
            expense: 'attraction',
            name: 'City Zoo',
            type: 'Zoo',
            duration: '4h',
            price: 25,
            countryCurrency: '$',
            day: 9
        },
        {
            id: '9',
            expense: 'attraction',
            name: 'Ancient Ruins',
            type: 'Historical Place',
            duration: '3h',
            price: 15,
            countryCurrency: '$',
            day: 9
        },
        {
            id: '1',
            expense: 'food',
            name: 'RESTRAUNT',
            type: 'Lunch',
            origin: 'Home',
            destination: 'Supermarket',
            price: 42,
            countryCurrency: '$',
            day: 9
        },
        {
            id: '1',
            expense: 'food',
            name: 'RESTRAUNT',
            type: 'Dinner',
            origin: 'Home',
            destination: 'Supermarket',
            price: 42,
            countryCurrency: '$',
            day: 8
        },
        {
            id: '10',
            expense: 'attraction',
            name: 'Grand Cathedral',
            type: 'Religious Place',
            duration: '1.5h',
            price: 0,
            countryCurrency: '$',
            day: 11
        },
        {
            id: '11',
            expense: 'attraction',
            name: 'Mystery Adventure',
            type: 'Others',
            duration: '2h',
            price: 50,
            countryCurrency: '$',
            day: 12
        },
        {
            id: '11',
            expense: 'attraction',
            name: 'Apartament House',
            type: 'Airbnb',
            duration: '3 days',
            price: 300,
            countryCurrency: '$',
            day: 12
        },
        {
            id: '7',
            expense: 'attraction',
            name: 'Gourmet Restaurant',
            type: 'Restaurant',
            duration: '1.5h',
            price: 75,
            countryCurrency: '$',
            day: 12
        },
        {
            id: '8',
            expense: 'attraction',
            name: 'National Park',
            type: 'Nature Place',
            duration: '6h',
            price: 20,
            countryCurrency: '$',
            day: 12
        },
        {
            id: '1',
            expense: 'airplane',
            airline: 'LATAM',
            origin: 'São Paulo',
            destination: 'Orlando',
            price: 1500,
            countryCurrency: '$',
            day: 12
        },
        {
            id: '1',
            expense: 'food',
            name: 'RESTRAUNT',
            type: 'Breakfast',
            origin: 'Home',
            destination: 'Supermarket',
            price: 42,
            countryCurrency: '$',
            day: 10
        },
        {
            id: '3',
            expense: 'accomodation',
            name: 'Luxury Hotel',
            type: 'Hotel',
            duration: 5,
            price: 500,
            countryCurrency: '$',
            day: 12
        },
        {
            id: '2',
            expense: 'accomodation',
            name: 'Youth Hostel',
            type: 'Hostel',
            duration: 2,
            price: 100,
            countryCurrency: '$',
            day: 2
        },
        {
            id: '5',
            expense: 'accomodation',
            name: 'Mansion',
            type: 'Other',
            duration: 7,
            price: 1500,
            countryCurrency: '$',
            day: 10
        },
        {
            id: '1',
            expense: 'food',
            name: 'RESTRAUNT',
            type: 'Snack',
            origin: 'Home',
            destination: 'Supermarket',
            price: 42,
            countryCurrency: '$',
            day: 1
        }
    ]);
    
    const [show, setShow] = useState<boolean | null>(null);
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

    return (
        <BodyPage>
            <TopPage>
                <GoBack to={getRoute('selectTrip')} />
            </TopPage>
            <MiddlePageOneCol>
                <div className="grid place-items-center items-center">
                    <div>
                        <h1 className="grid text-[22vw] xxs5:text-[21.2vw] xs:text-[15vw] lg:text-[4vw] w-full text-gray-900 tracking-tight leading-[0.6] xxs3:leading-[0.7]">
                            Trip Expenses
                        </h1>
                    </div>
                    <div>
                        <p className="xs:text-start text-[7.6vw] xxs8:text-[7.3vw] xs:text-[5.1vw] lg:text-[1.68vw] mt-[6.2vw] xxs5:mt-[6.9vw] xxs3:mt-[6.4vw] xs:mt-[5.7vw] lg:mt-[1.1vw] leading-tight text-gray-900 tracking-tight">
                            Track your trip and stay on budget!
                        </p>
                    </div>
                    {
                        show == true ?
                        <div className="w-full">
                            <ScrollArea className={`grid ${expenses.length < 4 ? 'h-auto' : 'h-[20.9vw]' } w-[25.7vw] mt-[1vw]`}>
                                <div className="ml-[0.65vw]">
                                    {
                                        expenses.map((obj: any, index: number) => (
                                            <Card key={index} className={`px-2 py-1 ${index == 0 ? 'mb-3' : index == expenses.length - 1 ? 'mt-3' : 'my-3'} mr-3`}>
                                                <div className="flex justify-between items-center m-0 p-0">
                                                    {
                                                        obj.expense == "airplane" ?
                                                        <>
                                                            <Plane strokeWidth={1.5} className="w-12 mr-3 h-auto"/>
                                                            <div className="w-full grid place-items-start text-sm">
                                                                <p className="break-all">
                                                                    <strong>
                                                                        { obj.airline }
                                                                    </strong>
                                                                </p>
                                                                <p className="flex gap-0.5 text-sm">
                                                                    <MapPin className="w-4 h-auto"/>
                                                                    { obj.origin }
                                                                </p>
                                                                <p className="flex gap-0.5 text-sm">
                                                                    <Flag className="w-4 h-auto"/>
                                                                    { obj.destination }
                                                                </p>
                                                                <div className="w-full flex justify-between pr-2">
                                                                    <div className="flex gap-1.5">
                                                                        <Wallet className="w-4 h-auto"/>
                                                                        <p className="break-all">
                                                                            { obj.countryCurrency }{ obj.price }
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex gap-0.5"><CalendarIcon className="w-4 h-auto"/>
                                                                        Day { obj.day }
                                                                        </div>
                                                                </div>
                                                            </div>
                                                        </> : 
                                                        obj.expense == "transportation" ?
                                                        <>
                                                            <Bus strokeWidth={1.5} className="w-12 mr-3 h-auto"/>
                                                            <div className="w-full grid place-items-start text-sm">
                                                                <p className="break-all">
                                                                    <strong>
                                                                        { obj.type }
                                                                    </strong>
                                                                </p>
                                                                <p className="flex gap-0.5 text-sm">
                                                                    <MapPin className="w-4 h-auto"/>
                                                                    { obj.origin }
                                                                </p>
                                                                <p className="flex gap-0.5 text-sm">
                                                                    <Flag className="w-4 h-auto"/>
                                                                    { obj.destination }
                                                                </p>
                                                                <div className="w-full flex justify-between pr-2">
                                                                    <div className="flex gap-1.5">
                                                                        <Wallet className="w-4 h-auto"/>
                                                                        <p className="break-all">
                                                                            { obj.countryCurrency }{ obj.price }
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex gap-0.5">
                                                                        <CalendarIcon className="w-4 h-auto"/>
                                                                        Day { obj.day }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </> :
                                                        obj.expense == "food" ?
                                                        <>
                                                            <Utensils strokeWidth={1.5} className="w-12 mr-3 h-auto"/>
                                                            <div className="w-full grid place-items-start text-sm">
                                                                <p className="break-all">
                                                                    <strong>
                                                                        { obj.name }
                                                                    </strong>
                                                                </p>
                                                                <div className="flex gap-0.5">
                                                                    { obj.type == 'Breakfast' ?
                                                                      <Coffee className="w-4 h-auto"/> :
                                                                      obj.type == 'Snack' ?
                                                                      <Pizza className="w-4 h-auto"/>  :
                                                                      obj.type == 'Lunch' ?
                                                                      <CookingPot className="w-4 h-auto"/>  :
                                                                      obj.type == 'Dinner' ?
                                                                      <Soup className="w-4 h-auto"/>  : null
                                                                    } 
                                                                    <p className="break-all">
                                                                        { obj.type }
                                                                    </p>
                                                                </div>
                                                                <p className="flex gap-0.5 text-sm">
                                                                    <MapPin className="w-4 h-auto"/>
                                                                    { obj.origin }
                                                                </p>
                                                                <div className="w-full flex justify-between pr-2">
                                                                    <div className="flex gap-1.5">
                                                                        <Wallet className="w-4 h-auto"/>
                                                                        <p className="break-all">
                                                                            { obj.countryCurrency }{ obj.price }
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex gap-0.5">
                                                                        <CalendarIcon className="w-4 h-auto"/>
                                                                        Day { obj.day }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </> : 
                                                        obj.expense == "attraction" ?
                                                        <>
                                                            <FerrisWheel strokeWidth={1.5} className="w-12 mr-3 h-auto"/>
                                                            <div className="w-full grid place-items-start text-sm">
                                                                <p className="break-all">
                                                                    <strong>
                                                                        { obj.name }
                                                                    </strong>
                                                                </p>
                                                                <div className="flex gap-0.5">
                                                                    { obj.type == 'Museum' ? 
                                                                      <Landmark className="w-4 h-auto" /> :
                                                                      obj.type == 'Park' ? 
                                                                      <TreePine className="w-4 h-auto" /> :
                                                                      obj.type == 'Event' ? 
                                                                      <Ticket className="w-4 h-auto" /> :
                                                                      obj.type == 'Theater' ? 
                                                                      <Theater className="w-4 h-auto" /> :
                                                                      obj.type == 'Zoo' ? 
                                                                      <PawPrint className="w-4 h-auto" /> :
                                                                      obj.type == 'Aquarium' ? 
                                                                      <Fish className="w-4 h-auto" /> :
                                                                      obj.type == 'Restaurant' ? 
                                                                      <Utensils className="w-4 h-auto" /> :
                                                                      obj.type == 'Nature Place' ? 
                                                                      <Mountain className="w-4 h-auto" /> :
                                                                      obj.type == 'Historical Place' ? 
                                                                      <Castle className="w-4 h-auto" /> :
                                                                      obj.type == 'Religious Place' ? 
                                                                      <Church className="w-4 h-auto" /> :
                                                                      obj.type == 'Others' ? 
                                                                      <Puzzle className="w-4 h-auto" /> : null 
                                                                    }
                                                                    <p className="break-all">
                                                                        { obj.type }
                                                                    </p>
                                                                </div>
                                                                <p className="flex gap-0.5 text-sm">
                                                                    <Timer className="w-4 h-auto"/>
                                                                    { obj.duration }
                                                                </p>
                                                                <div className="w-full flex justify-between pr-2">
                                                                    <div className="flex gap-1.5">
                                                                        <Wallet className="w-4 h-auto"/>
                                                                        <p className="break-all">
                                                                            { obj.countryCurrency }{ obj.price }
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex gap-0.5">
                                                                        <CalendarIcon className="w-4 h-auto"/>
                                                                        Day { obj.day }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </> : 
                                                        obj.expense == "accomodation" ?
                                                        <>
                                                            <Hotel strokeWidth={1.5} className="w-12 mr-3 h-auto"/>
                                                            <div className="w-full grid place-items-start text-sm">
                                                                <p className="break-all">
                                                                    <strong>
                                                                        { obj.name }
                                                                    </strong>
                                                                </p>
                                                                <div className="flex gap-0.5">
                                                                    { obj.type == 'Hotel' ?  
                                                                      <Bed className="w-4 h-auto"/> :  
                                                                      obj.type == 'Hostel' ?  
                                                                      <Users className="w-4 h-auto"/>  :  
                                                                      obj.type == 'Airbnb' ?  
                                                                      <Home className="w-4 h-auto"/>  :  
                                                                      obj.type == 'Guesthouse' ?  
                                                                      <Building className="w-4 h-auto"/>  :  
                                                                      obj.type == 'Other' ?  
                                                                      <BedSingle className="w-4 h-auto"/>  : null  
                                                                    }  
                                                                    <p className="break-all">
                                                                        { obj.type }
                                                                    </p>
                                                                </div>
                                                                <p className="flex gap-0.5 text-sm">
                                                                    <Clock className="w-4 h-auto"/>
                                                                    { obj.duration } Days
                                                                </p>
                                                                <div className="w-full flex justify-between pr-2">
                                                                    <div className="flex gap-1.5">
                                                                        <Wallet className="w-4 h-auto"/>
                                                                        <p className="break-all">
                                                                            { obj.countryCurrency }{ obj.price }
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex gap-0.5">
                                                                        <CalendarIcon className="w-4 h-auto"/>
                                                                        Day { obj.day }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </> : null
                                                    }
                                                    <div className="flex justify-center gap-1.5">
                                                        <Button variant={'outline'} className="w-9 h-9 p-0">
                                                            <Pencil className="w-5 h-auto p-0"/>
                                                        </Button>
                                                        <Button  className="w-9 h-9 p-0">
                                                            <X className="w-5 h-auto p-0"/>
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
                    <div className={`${show == false ? 'hidden' : ''} w-full grid gap-y-3 mt-[0.7vw]`}>
                        <Button 
                            size={'auto'} 
                            className={`gap-2 flex justify-center ${show == true ? 'mx-[0.66vw]' : ''}`} 
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
                            <div className="mt-[0.7vw]">
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
                            <div className="flex justify-center mt-[1vw]">
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
                    <div className={`${show == true ? 'hidden' : ''} w-full grid mt-[0.7vw]`}>
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
                              
                </div>
            </MiddlePageOneCol>
            <BottomPage>
                <Credits />
            </BottomPage>
        </BodyPage>
    )
}