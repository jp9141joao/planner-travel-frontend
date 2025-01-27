import Credits from "@/components/Credits";
import { GoBack } from "@/components/GoBack";
import { BodyPage, BottomPage, MiddlePageOneCol, TopPage } from "@/components/LayoutPage/Layouts";
import { Button } from "@/components/ui/button";
import { CarouselButton, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Map, CheckSquare, PiggyBank, Wallet } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Image1 from '../assets/undraw_travel-plans_l0fo (2).svg'
import Image2 from '../assets/undraw_travel-plans_l0fo (1).svg'
import Image3 from '../assets/undraw_journey_friends (3).svg'

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
            <MiddlePageOneCol>
                <div className="flex justify-center gap-32 " >
                    <div className="hidden w-full lg:grid place-items-left items-left mt-10" >
                        <img
                            src={Image1}
                            className="w-[12vw] h-auto "
                        />
                    </div>
                    <div className='grid place-items-center items-center w-full lg:w-[26.5vw] mx-auto mb-[5vw] mt-[3vw] xs:mb-[5vw]'>
                        <div className="lg:max-w-[26.5vw]">
                            <h1 className="grid text-center text-[18.5vw] xxs5:text-[9.85vw] xs:text-[12.7vw] lg:text-[3vw] w-full text-gray-900 tracking-tight leading-[0.9] break-all">
                                Trip to Rio de Janeiro
                            </h1>
                        </div>
                        <div>
                            <p className='text-center text-[7.2vw] xxs8:text-[6.1vw] xs:text-[4.79vw] lg:text-[1.7vw] mt-[4.5vw] xxs5:mt-[3vw] xs:mt-[2.8vw] lg:mt-[1vw] leading-tight text-gray-900 tracking-tight'>
                                Jan 20, 2025 - Fev 23, 2026
                            </p>
                        </div>
                        <div className="mt-3">
                            <CarouselButton opts={{align: "start" }} className="max-w-[80vw] lg:max-w-[26.5vw]" onScrollNext={handleColorNext} onScrollPrevious={handleColorPrevious}>
                                <CarouselContent className="w-full ml-0.4">
                                    {data.map((obj, index) => (
                                    <CarouselItem key={index} className={`pl-1 basis-1/2 `}>
                                        <div className="flex">
                                            <Button variant={color == index ? 'default' : 'outline'} className="w-full">
                                                <Link className="flex justify-center items-center gap-4" to={obj.href}>
                                                    {obj.icon}
                                                    {obj.name}
                                                </Link>
                                            </Button>                
                                        </div>
                                    </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious/>
                                <CarouselNext />
                            </CarouselButton>
                        </div>
                        <div className="w-full flex justify-start items-center gap-2">
                            <div className="w-full grid place-items-start text-start items-start break-words mt-3">
                                <p>
                                    <strong>Duration:</strong> 900 Days
                                </p>
                                <p>
                                    <strong>Budget:</strong> $99,000,000,000.00
                                </p>
                            </div>
                            <div className="w-full grid place-items-start text-start items-start break-words mt-3">
                                <p>
                                    <strong>Season:</strong> Middle
                                </p>
                                <p>
                                    <strong>Spent:</strong> $0.00
                                </p>
                            </div>
                        </div>
                        <div className="mt-3">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea id="notes" placeholder="Type your trip notes here!" className="w-[26.5vw] bg-transparent"/>
                        </div>
                    </div>
                    <div className="hidden w-full lg:grid place-items-start items-start mt-10">
                        <img
                            src={Image2}
                            className="w-[12vw] h-auto "
                        />
                    </div>
                </div>
                <div className="flex lg:hidden">
                    <div className="w-full grid place-items-start items-start">
                        <img
                            src={Image3}
                            className="w-full h-auto px-[8vw]"
                        />
                    </div>
                </div>
            </MiddlePageOneCol>
            <BottomPage>
                <Credits />
            </BottomPage>
        </BodyPage>
    )
}