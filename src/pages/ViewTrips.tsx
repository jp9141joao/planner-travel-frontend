import Credits from "@/components/Credits";
import { GoBack } from "@/components/GoBack";
import { BodyPage, BottomPage, MiddlePage, TopPage } from "@/components/LayoutPage/Layouts";
import Image from "../assets/undraw_eiffel-tower_ju2s.svg"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState } from "react";
import { Trip } from "@/types/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ViewTrips() {
    
    const [trips, setTrips] = useState<Trip[]>([
        {
          id: '8515805175548993886',
          tripName: 'Trip to Antarctica',
          period: 'Mar 04, 2026 - Mar 16, 2026',
          daysQty: 13,
          placesQty: 4,
        },
        {
          id: '5729294699681737993',
          tripName: 'Trip to South America',
          period: 'Dec 02, 2026 - Dec 10, 2026',
          daysQty: 9,
          placesQty: 1,
        },
        {
          id: '3370619451634542461',
          tripName: 'Trip to Antarctica',
          period: 'Jul 05, 2025 - Jul 12, 2025',
          daysQty: 8,
          placesQty: 5,
        },
        {
          id: '2309724424561533844',
          tripName: 'Trip to Africa',
          period: 'Dec 26, 2026 - Jan 07, 2027',
          daysQty: 13,
          placesQty: 2,
        },
        {
          id: '843957364789331813',
          tripName: 'Trip to South America',
          period: 'Oct 31, 2025 - Nov 04, 2025',
          daysQty: 5,
          placesQty: 4,
        },
        {
          id: '7092866250445387125',
          tripName: 'Trip to Africa',
          period: 'Jun 26, 2025 - Jul 08, 2025',
          daysQty: 13,
          placesQty: 5,
        },
        {
          id: '7011888582092397720',
          tripName: 'Trip to Asia',
          period: 'Feb 21, 2026 - Feb 28, 2026',
          daysQty: 8,
          placesQty: 5,
        },
        {
          id: '426362703034783719',
          tripName: 'Trip to Antarctica',
          period: 'Jun 15, 2026 - Jun 20, 2026',
          daysQty: 6,
          placesQty: 1,
        },
      ]);
      
    
    return (
        <BodyPage>
            <TopPage>
                <GoBack to="home"/>
            </TopPage>
            <MiddlePage>
                <div className="mx-[8.8vw] mt-[6vw] xs:mx-[15.5vw] xs:my-[7vw] lg:my-0 lg:mt-[1vw] lg:mx-[8vw]">
                    <img
                    src={Image}
                    className="w-auto h-auto"
                  />
                </div>
                <div className='text-center  mx-[8.8vw] lg:mx-0 mt-[6vw] xs:mt-[14vw] lg:mt-0 lg:mb-[3vw]'>
                  <div>
                      <h1 className="grid text-center text-[14vw] xxs5:text-[13.7vw] xs:text-[10.5vw] lg:text-[7vw] w-full text-gray-900 tracking-tight leading-[1]">
                          Your Trips!
                      </h1>
                  </div>
                  <div>
                      <p className='text-center text-[5.2vw] xxs8:text-[4.4vw] xs:text-[3.0vw] lg:text-[1.8vw] mt-[4.5vw] xxs5:mt-[4.2vw] xs:mt-[2.8vw] lg:mt-[1vw] leading-tight text-gray-900 tracking-tight'>
                        All your journeys in one place.
                      </p>
                  </div>
                  <div className="grid place-items-center mt-[1.3vw]">
                    <Carousel className="w-[39vw]">
                        <CarouselContent>
                            {
                                trips.length > 0 ? trips.map((trip: Trip, index: number) => (
                                    <div>
                                        <CarouselItem key={index}>
                                            <Card className="cursor-pointer w-[12vw] h-[11vw]">
                                                <CardContent>
                                                    <div className="grid place-items-center items-center gap-y-1">
                                                        <div>
                                                            <p className="text-[1.1vw] font-semibold leading-none tracking-tight">
                                                                { trip.tripName }
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-[0.75vw] text-muted-foreground">
                                                                { trip.period }
                                                            </p>
                                                        </div>
                                                        <div className="grid place-items-start w-full px-3">
                                                            <div>
                                                                <p className="text-[0.75vw] text-gray-800">
                                                                    { trip.daysQty } Days
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p className="text-[0.75vw] text-gray-900">
                                                                    { trip.placesQty } Places util now.
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p className="text-[0.75vw] font-semibold text-gray-900">
                                                                    High Seasson
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="pt-1">
                                                            <Button size={"card"} className="border-2 border-gray-900">
                                                                Open Journey
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                    </CarouselItem>
                                    </div>
                                    
                                )) :
                                <CarouselItem>You don't have trips yet.</CarouselItem>
                            }
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                  </div>
              </div>
            </MiddlePage>
            <BottomPage>
                <Credits/>
            </BottomPage>
        </BodyPage>          
    )
}