import Credits from "@/components/Credits";
import { GoBack } from "@/components/GoBack";
import { BodyPage, BottomPage, MiddlePageOneCol, TopPage } from "@/components/LayoutPage/Layouts";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Map, CheckSquare, PiggyBank, Wallet, Pencil, Receipt } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image1 from '../assets/undraw_travel-plans_l0fo (2).svg'
import Image2 from '../assets/undraw_travel-plans_l0fo (1).svg'
import Image3 from '../assets/undraw_journey_friends (3).svg'
import { type CarouselApi } from "@/components/ui/carousel"
import { getItemSessionStorage } from "@/components/utils/utils";
import { getTrip, updateNotes } from "@/service/service";
import { Trip } from "@/types/types";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";

export default function TripDetails() {

    const [trip, setTrip] = useState<Trip | null>(null);
    const [notes, setNotes] = useState<string>('');
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState<number>(0);
    const [count, setCount] = useState<number>(0);
    const data = [
        {
            name: 'Expenses',
            href: '/expenses',
            nmr: 0,
            icon: <Receipt />
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

    const getCurrencySymbol = (value: string) => {
        const symbols: { [key: string]: string } = {
            USD: '$',
            EUR: '€',
            BRL: 'R$',
            GBP: '£',
            JPY: '¥',
            AUD: 'A$',
            CAD: 'C$',
            CHF: 'Fr.',
            CNY: '¥',
            INR: '₹'
        };
        return symbols[value];
    }
    
    const loadTrip = async () => {
        try {
            const tripId = getItemSessionStorage('tripId');

            if (!tripId) {
                throw new Error('Trip Id is missing');
            }

            const response  = await getTrip('tripDetails' as string ,tripId as string);

            if (response.success) {
                setTrip(response.data);
                setNotes(response.data.notes);
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
    };

    const handleChange = async () => {
        try {
            const tripId = getItemSessionStorage('tripId');
            await updateNotes(tripId as string, notes as string);
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
        loadTrip();
    }, []);

    return (
        <BodyPage>
            <TopPage>
                <div className="flex justify-between">
                    <GoBack to={'viewTrips'} />
                    <Link className="cursor-pointer mt-3 mr-5" to={'/editTrip'} >
                        <Pencil />
                    </Link>
                </div>
            </TopPage>
            <MiddlePageOneCol>
                <div className="flex justify-center gap-32 mt-[4.5vw] xxs2:mt-[15vw] xs:mt-[7vw] sm:mt-[9vw] lg:mt-0" >
                    <div className="hidden w-full lg:grid place-items-left items-left mt-10" >
                        <img
                            src={Image1}
                            className="w-[12vw] h-auto "
                        />
                    </div>
                    <div className='grid place-items-center items-center w-full lg:w-[26.5vw] mx-auto mt-[3vw] xs:mb-[5vw]'>
                        <div className="w-[86.4vw] xs:w-[62.8vw] lg:max-w-[26.5vw]">
                            <h1 className="grid text-center text-[18.5vw] xxs5:text-[9.85vw] xs:text-[6.9vw] lg:text-[3vw] w-full text-gray-900 tracking-tight leading-[0.9] break-all">
                                {trip?.tripName}
                            </h1>
                        </div>
                        <div>
                            <p className='text-center text-[7.2vw] xxs8:text-[6.1vw] xs:text-[4.79vw] lg:text-[1.7vw] mt-[4.5vw] xxs5:mt-[3vw] xs:mt-[2.8vw] lg:mt-[1vw] leading-tight text-gray-900 tracking-tight'>
                                {trip?.period}
                            </p>
                        </div>
                        <div className="mt-3">
                            <Carousel opts={{align: "start" }} setApi={setApi} className="w-[87.8vw] xs:w-[61.5vw] lg:w-[26.73vw]">
                                <CarouselContent className="w-full items-center -ml-1 lg:ml-0.4">
                                    {data.map((obj, index) => (
                                    <CarouselItem key={index} className={`pl-1.5 basis-1/2 `}>
                                        <div className="flex">
                                            <Button 
                                                variant={(current == 1 && obj.name == 'Expenses') || 
                                                        (current == 2 && obj.name == 'Itinerary') ||
                                                        (current == 3 && obj.name == 'To Do List')
                                                        ? 'default' : 'outline'} 
                                                className="w-full">
                                                <Link className={`flex justify-center items-center ${obj.name != 'My Piggy Bank' ? 'gap-3' : 'gap-1'}`} to={obj.href}>
                                                    {obj.icon}
                                                    {obj.name}
                                                </Link>
                                            </Button>                
                                        </div>
                                    </CarouselItem>
                                    ))}
                                </CarouselContent>
                                
                            </Carousel>
                            <div className="flex justify-center mt-4">
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
                        </div>
                        <div className="w-[86.4vw] xs:w-[61.5vw] lg:w-[26.5vw] flex justify-start lg:justify-start items-center text-[3.4vw] xs:text-[2.4vw] lg:text-[0.8vw] gap-2">
                            <div className="w-full grid place-items-start text-start items-start break-all mt-3">
                                <p>
                                    <strong>Duration:</strong> {trip?.daysQty} Days
                                </p>
                                <p>
                                    <strong>Budget:</strong> {getCurrencySymbol(String(trip?.currency))}{trip?.budgetAmount}
                                </p>
                            </div>
                            <div className="w-full grid place-items-start text-start items-start break-all mt-3">
                                <p>
                                    <strong>Season:</strong> {trip?.season}
                                </p>
                                <p>
                                    <strong>Spent:</strong> {getCurrencySymbol(String(trip?.currency))}{trip?.spent}
                                </p>
                            </div>
                        </div>
                        <div className="w-full grid text-start gap-1.5 mt-3 px-[1vw]">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea value={notes == null ? '' : notes}
                                onBlur={() => notes != null ? handleChange() : null}
                                onChange={(e) => {
                                    if (e.target.value.length <= 255) {
                                        setNotes(e.target.value);
                                    }
                                }} 
                                id="notes" 
                                placeholder="Type your trip notes here!" 
                                className="w-full lg:w-[26.5vw] bg-transparent"/>
                        </div>
                        <Toaster />
                    </div>
                    <div className="hidden w-full lg:grid place-items-left items-left mt-10" >
                        <img
                            src={Image2}
                            className="w-[12vw] h-auto "
                        />
                    </div>
                </div>
                <div className="lg:hidden w-full grid place-items-start items-start">
                    <img
                        src={Image3}
                        className="w-full h-auto px-[11vw] xxs3:px-[8vw] xs:px-[23.4vw] sm:px-[18.5vw]"
                    />
                </div>
            </MiddlePageOneCol>
            <BottomPage>
                <Credits />
            </BottomPage>
        </BodyPage>
    )
}    
