import { CarouselDemo } from "@/components/CarrouselDemo";
import Credits from "@/components/Credits";
import { GoBack } from "@/components/GoBack";
import { BodyPage, BottomPage, MiddlePage, TopPage } from "@/components/LayoutPage/Layouts";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselButton, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Map, CheckSquare, PiggyBank, Wallet } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const data = [
    {
        name: 'Expenses',
        href: '/expenses',
        nmr: 0,
        icon: <Wallet />
    },
    {
        name: 'Itinerary',
        href: '/itinerary',
        nmr: 1,
        icon: <Map />
    },
    {
        name: 'To Do List',
        href: '/toDoList',
        nmr: 2,
        icon: <CheckSquare />
    },
    {
        name: 'My Piggy Bank',
        href: '/myPiggyBank',
        nmr: 3,
        icon: <PiggyBank />
    },
];

{/*const data = [
    {
        name: 'Expenses',
        href: '/expenses',
        nmr: 0,
        icon: <Wallet />
    },
    {
        name: 'Itinerary',
        href: '/itinerary',
        nmr: 1,
        icon: <Map />
    },
    {
        name: 'To Do List',
        href: '/toDoList',
        nmr: 2,
        icon: <CheckSquare />
    },
    {
        name: 'My Piggy Bank',
        href: '/myPiggyBank',
        nmr: 3,
        icon: <PiggyBank />
    },
    {
        name: 'Trip Details',
        href: null,
        nmr: 4,
        icon: null 
    },
    {
        name: 'Notes',
        href: null,
        nmr: 5,
        icon: null
    }
]; */}

const local = [
    {}, {}
];

export default function TripDetails() {

    const [color, setColor] = useState<number>(0);

    const handleColorNext = () => {
        console.log(color + 10)
        if (color == data.length - 1) {
            return
        }

        setColor(color + 1);
    }

    const handleColorPrevious = () => {
        console.log(color + 20)
        if (color == 0) {
            return
        }

        setColor(color - 1);
    }

    return (
        <BodyPage>
            <TopPage>
                <GoBack to="viewTrips" />
            </TopPage>
            <MiddlePage>
                <div>

                </div>
                <div className='grid place-items-center mx-auto mb-[5vw] mt-[3vw] xs:mb-0'>
                    <div>
                        <h1 className="grid text-center text-[18.5vw] xxs5:text-[18vw] xs:text-[12.7vw] lg:text-[4.1vw] w-full text-gray-900 tracking-tight leading-[0.9]">
                            Trip to Sidney
                        </h1>
                    </div>
                    <div>
                        <p className='text-center text-[7.2vw] xxs8:text-[6.9vw] xs:text-[4.79vw] lg:text-[1.8vw] mt-[4.5vw] xxs5:mt-[4.2vw] xs:mt-[2.8vw] lg:mt-[1vw] leading-tight text-gray-900 tracking-tight'>
                            Jan 20, 2025 - Fev 23, 2026
                        </p>
                    </div>
                    <div className="mt-3">
                        <CarouselButton opts={{align: "start" }} className="w-full max-w-md" onScrollNext={handleColorNext} onScrollPrevious={handleColorPrevious}>
                            <CarouselContent className="-ml-1">
                                {data.map((obj, index) => (
                                <CarouselItem key={index} className={`pl-1 basis-1/2 `}>
                                    <div className="flex">
                                        <Button variant={color == index ? 'default' : 'outline'} className="w-full">
                                            <Link className="flex justify-center items-center gap-2" to={obj.href ? obj.href : ''}>
                                                {obj.icon}
                                                {obj.name}
                                            </Link>
                                        </Button>                
                                    </div>
                                </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div>
                                <CarouselPrevious/>
                            </div>
                            <div>
                                <CarouselNext />
                            </div>
                        </CarouselButton>
                    </div>
                    
                </div>
            </MiddlePage>
            <BottomPage>
                <Credits />
            </BottomPage>
        </BodyPage>
    )
}