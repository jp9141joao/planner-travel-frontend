import { CarouselDemo } from "@/components/CarrouselDemo";
import Credits from "@/components/Credits";
import { GoBack } from "@/components/GoBack";
import { BodyPage, BottomPage, MiddlePage, TopPage } from "@/components/LayoutPage/Layouts";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { PiggyBank } from "lucide-react";
import { Link } from "react-router-dom";

const data = [
    {
        name: 'Expenses',
        href: '/expenses',
        nmr: 0
    }, {
        name: 'Itinerary',
        href: '/itinerary',
        nmr: 1
    }, {
        name: 'To Do List',
        href: '/toDoList',
        nmr: 2
    }, {
        name: 'My Piggy Bank',
        href: '/myPiggyBank',
        nmr: 3
    }, {
        name: 'Trip Details',
        href: null,
        nmr: 4
    }, {
        name: 'Notes',
        href: null,
        nmr: 5
    }
]

export default function TripDetails() {

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
                        <Carousel className="w-full max-w-sm">
                            <CarouselContent className="-ml-1">
                                {data.map((obj, index) => (
                                <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                                    <div className="p-1">
                                        <Button variant={"outline"} className="w-full">
                                            <Link to={obj.href ? obj.href : ''}>
                                                {obj.name}
                                            </Link>
                                        </Button>                
                                    </div>
                                </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                        <Carousel className="w-full max-w-sm">
                            <CarouselContent className="w-full">
                                {data.map((obj, index) => (
                                    <CarouselItem key={index} className={`flex w-full ${index == obj.nmr ? 'basis-[21vw]' : ''} ${index == 0 ? '' : ''}`}>
                                        <div>
                                            <Button className="rounded-[200vw]">
                                                {index}
                                            </Button>                
                                        </div>
                                        <div className="flex items-center w-full">
                                            <div className="flex items-center w-full">
                                                <div className="w-full h-[2px] bg-gray-900"></div>
                                            </div>
                                        </div>
                                </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </div>
            </MiddlePage>
            <BottomPage>
                <Credits />
            </BottomPage>
        </BodyPage>
    )
}