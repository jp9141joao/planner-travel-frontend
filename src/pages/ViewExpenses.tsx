import Credits from "@/components/Credits";
import { GoBack } from "@/components/GoBack";
import { BodyPage, BottomPage, MiddlePageOneCol, TopPage } from "@/components/LayoutPage/Layouts";
import { ScrollAreaDemo } from "@/components/Scroll";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getItemSessionStorage, getRoute } from "@/components/utils/utils";
import { AccomodationExpense, AirplaneExpense, AttractionExpense, FoodExpense, TransportationExpense } from "@/service/api";
import { Bus, CalendarIcon, Flag, Hotel, Link, MapPin, Pencil, Plane, Plus, Receipt, Ticket, Utensils, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function ViewExpenses() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState<number>(0);
    const [count, setCount] = useState<number>(0);
    const [expenses, setExpenses] = useState<(AirplaneExpense | TransportationExpense | FoodExpense | AttractionExpense | AccomodationExpense)[]>([
        {
            id: '1',
            expense: 'airplane',
            airline: 'LATAM',
            origin: 'São Paulo',
            destination: 'Orlando',
            price: 1500,
            countryCurrency: '$',
            day: 1
        },
        {
            id: '1',
            expense: 'transportation',
            type: 'UBER',
            origin: 'Aeroport',
            destination: 'Apartament',
            price: 10,
            countryCurrency: '$',
            day: 4
        },
        {
            id: '1',
            expense: 'transportation',
            type: 'TAXI',
            origin: 'Home',
            destination: 'Supermarket',
            price: 42,
            countryCurrency: '$',
            day: 7
        },
        {
            id: '1',
            expense: 'airplane',
            airline: 'EMIRATES',
            origin: 'Orlando',
            destination: 'Los Angeles',
            price: 1500,
            countryCurrency: '$',
            day: 1
        },
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
            icon: <Ticket />
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
                                                        obj.expense == 'airplane' ?
                                                        <>
                                                            <Plane strokeWidth={1.5} className="w-12 mr-2 h-auto"/>
                                                            <div className="w-full grid place-items-start text-sm">
                                                                <p className="break-all">
                                                                    { obj.airline }
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
                                                                    <p>
                                                                        { obj.countryCurrency }{ obj.price }
                                                                    </p>
                                                                    <div className="flex gap-0.5"><CalendarIcon className="w-4 h-auto"/>
                                                                        Day { obj.day }
                                                                        </div>
                                                                </div>
                                                            </div>
                                                        </> : 
                                                        obj.expense == "transportation" ?
                                                        <>
                                                            <Bus strokeWidth={1.5} className="w-12 mr-2 h-auto"/>
                                                            <div className="w-full grid place-items-start text-sm">
                                                                <p className="break-all">
                                                                    { obj.type }
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
                                                                    <p>
                                                                        { obj.countryCurrency }{ obj.price }
                                                                    </p>
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