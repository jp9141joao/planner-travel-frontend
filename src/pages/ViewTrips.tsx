import Credits from "@/components/Credits";
import { GoBack } from "@/components/GoBack";
import { BodyPage, BottomPage, MiddlePageOneCol, TopPage } from "@/components/LayoutPage/Layouts";
import Image from "../assets/undraw_eiffel-tower_ju2s.svg"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Trip } from "@/types/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getTrips } from "@/service/service";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export function ViewTrips() {
    
    const [trips, setTrips] = useState<Trip[]>([
        {
            id: '8515805175548993886',
            tripName: 'Trip to Antarctica',
            period: 'Mar 04, 2026 - Mar 16, 2026',
            daysQty: 13,
            placesQty: 4,
            currency: '$', // USD
            budgetAmount: 5000,
        },
        {
            id: '3370619451634542461',
            tripName: 'WWWWWWWWWWWWWWW',
            period: 'Jul 05, 2025 - Jul 12, 2025',
            daysQty: 8,
            placesQty: 5,
            currency: 'R$', // BRL
            budgetAmount: 15000,
        },
        {
            id: '2309724424561533844',
            tripName: 'Trip to Africa',
            period: 'Dec 26, 2026 - Jan 07, 2027',
            daysQty: 13,
            placesQty: 2,
            currency: '£', // GBP
            budgetAmount: 4000,
        },
        {
            id: '843957364789331813',
            tripName: 'Trip to South America',
            period: 'Oct 31, 2025 - Nov 04, 2025',
            daysQty: 5,
            placesQty: 4,
            currency: '¥', // JPY
            budgetAmount: 500000,
        },
        {
            id: '7092866250445387125',
            tripName: 'Trip to Africa',
            period: 'Jun 26, 2025 - Jul 08, 2025',
            daysQty: 13,
            placesQty: 5,
            currency: 'A$', // AUD
            budgetAmount: 7000,
        },
        {
            id: '426362703034783719',
            tripName: 'Trip to Antarctica',
            period: 'Jun 15, 2026 - Jun 20, 2026',
            daysQty: 6,
            placesQty: 1,
            currency: '₹', // INR
            budgetAmount: 100000,
        },
    ]);




    const loadTrips = async () => {
        try {
            const response = await getTrips();

            if (response.success) {
                setTrips([response.data]);
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
        }
    }
      
    useEffect(() => {
        //loadTrips();
    }, [])
    
    return (
        <BodyPage>
            <TopPage>
                <GoBack to="home"/>
            </TopPage>
            <MiddlePageOneCol>
                {
                    /*
                    <div className="mx-[8.8vw] mt-[6vw] xs:mx-[15.5vw] xs:my-[7vw] lg:my-0 lg:mt-[1vw] lg:mx-[8vw]">
                
                <img
                src={Image}
                className="w-auto h-auto"
                />
                
                </div>
                    */
                }
                <div className='text-center mx-[8.8vw] lg:mx-0 mt-[6vw] xs:mt-[14vw] lg:mt-0 lg:mb-[3vw]'>
                    <div>
                        <h1 className="grid text-center text-[14vw] xxs5:text-[13.7vw] xs:text-[10.5vw] lg:text-[6.2vw] w-full text-gray-900 tracking-tight leading-[1]">
                            Your Trips!
                        </h1>
                    </div>
                    <div>
                        <p className='text-center text-[5.2vw] xxs8:text-[4.4vw] xs:text-[3.0vw] lg:text-[1.8vw] mt-[4.5vw] xxs5:mt-[4.2vw] xs:mt-[2.8vw] lg:mt-[1vw] leading-tight text-gray-900 tracking-tight'>
                            All your journeys in one place.
                        </p>
                    </div>
                    <div className="grid place-items-center mt-[1.3vw]">
                        <Carousel className="w-[26vw] grid place-items-center">
                            <CarouselContent className="w-[20.8vw]">
                                {
                                    trips.length > 0 ? trips.map((trip: Trip, index: number) => ( 
                                        index == 0 ? 
                                        <div className="">
                                            <CarouselItem key={index} className="flex gap-4 -ml-[15.2vw]">
                                                <Card className="w-[16vw] h-[11.4vw]">
                                                    <CardContent>
                                                        
                                                    </CardContent>
                                                </Card>
                                                <Card className="grid w-[16vw] h-[11.4vw]">
                                                    <CardContent>
                                                        <div className="grid items-center w-full h-full">
                                                            <div className="grid place-items-center">
                                                                <div>
                                                                    <p className="text-[1.17vw] font-semibold leading-none tracking-tight break-all">
                                                                        { trip.tripName }.
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[0.96vw] text-muted-foreground mt-1">
                                                                        { trip.period }.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="grid place-items-start items-centerm mx-1">
                                                                <div>
                                                                    <p className="text-[0.9vw] text-gray-800">
                                                                        { trip.daysQty } Days.
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[0.9vw] text-gray-900">
                                                                        { trip.placesQty } Places util now.
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[0.9vw] text-gray-900">
                                                                        Budget: { trip.currency }{ trip.budgetAmount } .
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[0.9vw] font-semibold text-gray-900">
                                                                        High Seasson
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </CarouselItem>
                                        </div> : index == trips.length -1 ?
                                        <div className="">
                                            <CarouselItem key={index} className="flex gap-4 -mr-[15.2vw]">
                                                <Card className="grid w-[16vw] h-[11.4vw]">
                                                    <CardContent>
                                                        <div className="grid items-center w-full h-full">
                                                            <div className="grid place-items-center">
                                                                <div>
                                                                    <p className="text-[1.17vw] font-semibold leading-none tracking-tight break-all">
                                                                        { trip.tripName }.
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[0.96vw] text-muted-foreground mt-1">
                                                                        { trip.period }.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="grid place-items-start items-centerm mx-1">
                                                                <div>
                                                                    <p className="text-[0.9vw] text-gray-800">
                                                                        { trip.daysQty } Days.
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[0.9vw] text-gray-900">
                                                                        { trip.placesQty } Places util now.
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[0.9vw] text-gray-900">
                                                                        Budget: { trip.currency }{ trip.budgetAmount } .
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[0.9vw] font-semibold text-gray-900">
                                                                        High Seasson
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                                <Card className="w-[16vw] h-[11.4vw]">
                                                    <CardContent>
                                                        
                                                    </CardContent>
                                                </Card>
                                            </CarouselItem>
                                        </div>:
                                        <div>
                                            <CarouselItem key={index} className="">
                                                <Card className="grid w-[16vw] h-[11.4vw] pb-2">
                                                    <CardContent>
                                                        <div className="grid items-center w-full h-full">
                                                            <div className="grid place-items-center">
                                                                <div>
                                                                    <p className="text-[1.17vw] font-semibold leading-none tracking-tight break-all">
                                                                        { trip.tripName }.
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[0.96vw] text-muted-foreground mt-1">
                                                                        { trip.period }.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="grid place-items-start items-centerm mx-1">
                                                                <div>
                                                                    <p className="text-[0.9vw] text-gray-800">
                                                                        { trip.daysQty } Days.
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[0.9vw] text-gray-900">
                                                                        { trip.placesQty } Places util now.
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[0.9vw] text-gray-900">
                                                                        Budget: { trip.currency }{ trip.budgetAmount } .
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[0.9vw] font-semibold text-gray-900">
                                                                        High Seasson
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </CarouselItem>
                                        </div>
                                    )) :
                                    <div>
                                        <CarouselItem className="flex gap-4 -ml-[15.2vw]">
                                        <Card className="w-[16vw] h-[11.4vw]">
                                            <CardContent>
                                                
                                            </CardContent>
                                        </Card>
                                        <Card className="w-[16vw] h-[11.4vw]">
                                            <CardContent>
                                                <div className="grid place-items-center">
                                                    <div>
                                                        <p className="text-[1.17vw] font-semibold leading-none tracking-tight break-all">
                                                            No Trips Created Yet.
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[0.96vw] text-muted-foreground mt-1">
                                                            Start planning your first adventure and make your travel dreams come true!
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <Card className="w-[16vw] h-[11.4vw]">
                                            <CardContent>
                                                
                                            </CardContent>
                                        </Card>
                                        </CarouselItem>
                                    </div>
                                }
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                        <div className="w-full mt-[1.3vw]">
                            <Button className="w-full">
                                <Link to={trips.length > 0 ? '/addTrips' : '/viewTrips'}>
                                {
                                    trips.length > 0 ?
                                    'Acess This Trip' :
                                    'Create Your First Trip'
                                }
                                </Link>
                            </Button>
                        </div>
                        {
                            trips.length > 0 ?
                            <div className="flex justify-center items-center gap-1.5 w-full text-[4vw] xxs5:text-sm mt-[0.8vw] sm:text-base lg:text-lg">
                                <p>
                                    Want to create another trip?
                                </p>
                                <Link to={"/addTrips"}>
                                    <strong>
                                        Click here.
                                    </strong>
                                </Link>
                            </div> : ''
                        }
                    </div>
                    <Toaster />
                </div>
            </MiddlePageOneCol>
            <BottomPage>
                <Credits/>
            </BottomPage>
        </BodyPage>          
    )
}
