import Credits from "@/components/Credits";
import { GoBack } from "@/components/GoBack";
import { BodyPage, BottomPage, MiddlePageOneCol, TopPage } from "@/components/LayoutPage/Layouts";
import { ScrollAreaDemo } from "@/components/Scroll";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AccomodationExpense, AirplaneExpense, AttractionExpense, FoodExpense, TransportationExpense } from "@/service/api";
import { Bus, Hotel, Link, Plane, Ticket, Utensils } from "lucide-react";
import { useEffect, useState } from "react";

export default function ViewExpanses() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState<number>(0);
    const [count, setCount] = useState<number>(0);
    const [expanses, setExpenses] = useState<(AirplaneExpense | TransportationExpense | FoodExpense | AttractionExpense | AccomodationExpense)[]>([
        {
            id: '1',
            airline: 'test',
            origin: 'test',
            destination: 'test',
            price: 10,
            countryCurrency: 'test'
        },
        {
            id: '1',
            airline: 'test',
            origin: 'test',
            destination: 'test',
            price: 10,
            countryCurrency: 'test'
        },
        {
            id: '1',
            airline: 'test',
            origin: 'test',
            destination: 'test',
            price: 10,
            countryCurrency: 'test'
        },
        {
            id: '1',
            airline: 'test',
            origin: 'test',
            destination: 'test',
            price: 10,
            countryCurrency: 'test'
        },
        {
            id: '1',
            airline: 'test',
            origin: 'test',
            destination: 'test',
            price: 10,
            countryCurrency: 'test'
        },
        {
            id: '1',
            airline: 'test',
            origin: 'test',
            destination: 'test',
            price: 10,
            countryCurrency: 'test'
        },
        {
            id: '1',
            airline: 'test',
            origin: 'test',
            destination: 'test',
            price: 10,
            countryCurrency: 'test'
        },
        {
            id: '1',
            airline: 'test',
            origin: 'test',
            destination: 'test',
            price: 10,
            countryCurrency: 'test'
        },
        {
            id: '1',
            airline: 'test',
            origin: 'test',
            destination: 'test',
            price: 10,
            countryCurrency: 'test'
        },
        {
            id: '1',
            airline: 'test',
            origin: 'test',
            destination: 'test',
            price: 10,
            countryCurrency: 'test'
        },
        {
            id: '1',
            airline: 'test',
            origin: 'test',
            destination: 'test',
            price: 10,
            countryCurrency: 'test'
        },

    ]);
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
                <GoBack to="selectTrip" />
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
                    <div className="mt-[1vw]">
                        <Carousel opts={{align: "start" }} setApi={setApi} className="w-[87.8vw] xs:w-[61.5vw] lg:w-[24.73vw]">
                            <CarouselContent className="w-full items-center -ml-1 lg:ml-0.4">
                                {data.map((obj, index) => (
                                <CarouselItem key={index} className={`pl-1.5 basis-1/2 `}>
                                    <div className="w-full flex">
                                        <Button 
                                            variant={(current == 1 && obj.name == 'Airplane') || 
                                                    (current == 2 && obj.name == 'Transport') ||
                                                    (current == 3 && obj.name == 'Food') ||
                                                    (current == 4 && obj.name == 'Attraction')
                                                    ? 'default' : 'outline'} 
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
                    <div className="w-full">
                        <ScrollArea className="grid h-[14vw] w-[25.7vw]">
                            <div className="ml-[0.65vw]">
                                {
                                    expanses.map((expanse: any) => (
                                        <div className="my-3 mr-3">
                                            <Card>
                                                <CardContent>
                                                    <div className="">
                                                        <p>
                                                            { "airline" in expanse ? 
                                                                expanse.airline : null
                                                            }
                                                            {
                                                                expanse.id
                                                            }
                                                        </p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    ))
                                }
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </MiddlePageOneCol>
            <BottomPage>
                <Credits />
            </BottomPage>
        </BodyPage>
    )
}