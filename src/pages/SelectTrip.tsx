import Credits from "@/components/Credits";
import { GoBack } from "@/components/GoBack";
import { BodyPage, BottomPage, MiddlePage, MiddlePageOneCol, TopPage } from "@/components/LayoutPage/Layouts";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toaster } from "@/components/ui/toaster";
import { getItemSessionStorage, setItemSessionStorage } from "@/components/utils/utils";
import { toast } from "@/hooks/use-toast";
import { getTrips } from "@/service/service";
import { Trip } from "@/types/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SelectTrip() {
    const [route, setRoute] = useState<string>('');
    const [trips, setTrips] = useState<Trip[]>([]);
    const [tripsExist, setTripsExist] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [tripSelected, setTripSelected] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);


    const loadTrips = async () => {
        try {
            const response = await getTrips();

            if (response.success) {
                setTrips(response.data);
                
                if (response.data.length > 0) {
                    setTripsExist(true);
                } else {
                    setTripsExist(false);
                }
                
            } else {
                toast({
                    variant: 'destructive',
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                });
            }
        } catch (error: any) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        }
    };

    useEffect(() => {
        if (tripSelected == '*' || tripSelected == '' ) {
            setIsDisabled(true);
            localStorage.removeItem('tripId');
        } else {
            setIsDisabled(false);
            setItemSessionStorage('tripId', tripSelected);
        }
    }, [tripSelected]);

    {/*
        useEffect(() => {
        const routeData = getItemSessionStorage('route' );

        if (!routeData) {
            throw new Error('Route destination is missing');
        }

        setRoute(routeData);
        loadTrips();
    }, [])    
    */}

    return (
        <BodyPage>
            <TopPage>
                <GoBack to={'home'}/>
            </TopPage>
            <MiddlePageOneCol>
                <div className="grid place-items-center">
                    <div>
                        <h1 className="grid text-[16.1vw]  xxs8:text-[15.8vw] xs:text-[10.8vw] lg:text-[5.2vw] w-full text-gray-900 tracking-tight leading-[0.6] xxs3:leading-[0.7]">
                            Select Your Trip!
                        </h1>
                    </div>
                    <div>
                        <p className="xs:text-start text-[8.7vw] xxs8:text-[8.4vw] xs:text-[5.9vw] lg:text-[2.1vw] mt-[4vw] xxs5:mt-[3.2vw] xs:mt-[5.7vw] lg:mt-[1.2vw] leading-tight text-gray-900 tracking-tight">
                            Pick a trip to proceed.
                        </p>
                    </div>
                    <div className="flex w-full items-center mt-[4vw] xxs5:mt-[4vw] xs:mt-[2vw] lg:mt-[1.2vw]">
                            <Select 
                                defaultValue={trips.length === 0 ? "*" : ""}
                                value={tripSelected}
                                onValueChange={(e) => setTripSelected(e)} 
                                open={isOpen} 
                                onOpenChange={setIsOpen}
                            >
                                <SelectTrigger className="rounded-md">
                                    <SelectValue placeholder="Select Your Trip">
                                        <div>
                                        <p className="text-[3.4vw] xxs3:text-[3.2vw] xs:text-[2.4vw] lg:text-[1vw] breaK-all">
                                        {tripSelected && tripSelected != '*'
                                            ? trips.find((trip) => trip.id === tripSelected)?.tripName 
                                            : "Select Your Trip"}
                                        </p>
                                        </div>
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent className={`${tripsExist ? 'max-h-[70vw] lg:h-[16vw]' : null}`}>
                                    <SelectGroup>
                                        {tripsExist ? (
                                            trips.map((trip: Trip, index: number) => (
                                                <SelectItem key={index} value={trip.id}>
                                                    <div>
                                                        <p className="text-gray-900">
                                                            {trip.tripName}
                                                        </p>
                                                        <p>
                                                            {isOpen ? `${trip.period}` : null}
                                                        </p>
                                                    </div>
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem value="*">No trips created yet</SelectItem>
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                    </div>
                    <div className="w-full mt-[3vw] xs:mt-[2vw] lg:mt-[0.7vw]">
                        <Button size={"card"} disabled={isDisabled}>
                            <Link to={`${route}`}>
                                Continue
                            </Link>
                        </Button>
                    </div>
                </div>
            </MiddlePageOneCol>
            <BottomPage>
                <Credits/>
            </BottomPage>
        </BodyPage>
    )
}