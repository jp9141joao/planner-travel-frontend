import Credits from "@/components/Credits";
import { GoBack } from "@/components/GoBack";
import { BodyPage, BottomPage, MiddlePage, TopPage } from "@/components/LayoutPage/Layouts";
import Image from "../assets/undraw_eiffel-tower_ju2s_flipped.svg"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Trip } from "@/types/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getTrips } from "@/service/service";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoreHorizontal, TrendingUp } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function ViewTrips() {
    
    const [trips, setTrips] = useState<Trip[]>([
        {
            id: '7101923785401883001',
            tripName: 'Expedition to the Arctic',
            period: 'Apr 15, 2025 - Apr 25, 2025',
            daysQty: 11,
            placesQty: 3,
            currency: '€', // EUR
            budgetAmount: 6000,
            season: 'Middle',
        },
        {
            id: '9982750139284717261',
            tripName: 'Journey through Asia',
            period: 'Nov 01, 2025 - Nov 14, 2025',
            daysQty: 14,
            placesQty: 6,
            currency: '₩', // KRW
            budgetAmount: 8000,
            season: 'High',
        },
        {
            id: '2946725839203741829',
            tripName: 'European Summer Adventure',
            period: 'Jun 10, 2025 - Jun 20, 2025',
            daysQty: 11,
            placesQty: 8,
            currency: '£', // GBP
            budgetAmount: 12000,
            season: 'High',
        },
        {
            id: '1207583948275461234',
            tripName: 'Exploring the Amazon',
            period: 'Sep 05, 2026 - Sep 15, 2026',
            daysQty: 11,
            placesQty: 5,
            currency: '$', // USD
            budgetAmount: 4500,
            season: 'Low',
        },
        {
            id: '4827103985476130891',
            tripName: 'Discovering Japan',
            period: 'Mar 20, 2025 - Apr 01, 2025',
            daysQty: 13,
            placesQty: 7,
            currency: '¥', // JPY
            budgetAmount: 550000,
            season: 'Middle',
        },
        {
            id: '2198475620317489203',
            tripName: 'Road Trip through the USA',
            period: 'Jul 01, 2025 - Jul 20, 2025',
            daysQty: 20,
            placesQty: 10,
            currency: '$', // USD
            budgetAmount: 10000,
            season: 'High',
        },
        {
            id: '8492730156837450912',
            tripName: 'Trekking in Nepal',
            period: 'Oct 15, 2026 - Oct 30, 2026',
            daysQty: 16,
            placesQty: 3,
            currency: '₹', // INR
            budgetAmount: 70000,
            season: 'High',
        },
        {
            id: '4209837490568172345',
            tripName: 'Desert Safari in Dubai',
            period: 'Dec 01, 2025 - Dec 10, 2025',
            daysQty: 10,
            placesQty: 2,
            currency: 'د.إ', // AED
            budgetAmount: 9000,
            season: 'Middle',
        },
        {
            id: '5127403981567320497',
            tripName: 'Caribbean Cruise',
            period: 'Jan 05, 2026 - Jan 15, 2026',
            daysQty: 11,
            placesQty: 6,
            currency: '$', // USD
            budgetAmount: 5000,
            season: 'High',
        },
        {
            id: '2148390567439208145',
            tripName: 'Mediterranean Escape',
            period: 'Aug 10, 2025 - Aug 18, 2025',
            daysQty: 9,
            placesQty: 4,
            currency: '€', // EUR
            budgetAmount: 7000,
            season: 'High',
        },
        {
            id: '8701927345098712341',
            tripName: 'Adventure in New Zealand',
            period: 'Feb 10, 2026 - Feb 25, 2026',
            daysQty: 16,
            placesQty: 5,
            currency: 'NZ$', // NZD
            budgetAmount: 12000,
            season: 'Middle',
        },
        {
            id: '3247890156432987120',
            tripName: 'Canadian Rockies Tour',
            period: 'May 15, 2026 - May 25, 2026',
            daysQty: 11,
            placesQty: 4,
            currency: 'CA$', // CAD
            budgetAmount: 6000,
            season: 'Middle',
        },
        {
            id: '4560982710346581293',
            tripName: 'Bali Beaches Escape',
            period: 'Apr 01, 2026 - Apr 10, 2026',
            daysQty: 10,
            placesQty: 3,
            currency: 'IDR', // Indonesian Rupiah
            budgetAmount: 2500000,
            season: 'High',
        },
        {
            id: '8102937456812734509',
            tripName: 'Patagonia Hiking Adventure',
            period: 'Nov 15, 2025 - Nov 30, 2025',
            daysQty: 16,
            placesQty: 4,
            currency: '$', // USD
            budgetAmount: 8000,
            season: 'Middle',
        },
        {
            id: '1029837456123784091',
            tripName: 'Norwegian Fjord Exploration',
            period: 'Sep 01, 2026 - Sep 10, 2026',
            daysQty: 10,
            placesQty: 6,
            currency: 'kr', // NOK
            budgetAmount: 7000,
            season: 'Low',
        },
        {
            id: '8902134576029487134',
            tripName: 'Exploring the Galápagos',
            period: 'Jun 01, 2025 - Jun 10, 2025',
            daysQty: 10,
            placesQty: 2,
            currency: '$', // USD
            budgetAmount: 4500,
            season: 'High',
        },
        {
            id: '3720415892364710284',
            tripName: 'Safari in Tanzania',
            period: 'Aug 20, 2025 - Sep 01, 2025',
            daysQty: 13,
            placesQty: 5,
            currency: 'TSh', // Tanzanian Shilling
            budgetAmount: 6000,
            season: 'High',
        },
        {
            id: '8910247563284901234',
            tripName: 'Great Barrier Reef Dive',
            period: 'Mar 15, 2025 - Mar 25, 2025',
            daysQty: 11,
            placesQty: 3,
            currency: 'A$', // AUD
            budgetAmount: 5000,
            season: 'Middle',
        },
        {
            id: '9012873456123490823',
            tripName: 'Cultural Tour of India',
            period: 'Feb 01, 2025 - Feb 20, 2025',
            daysQty: 20,
            placesQty: 10,
            currency: '₹', // INR
            budgetAmount: 90000,
            season: 'High',
        },
        {
            id: '2849015674320918745',
            tripName: 'Icelandic Volcanoes',
            period: 'Oct 01, 2025 - Oct 10, 2025',
            daysQty: 10,
            placesQty: 2,
            currency: 'kr', // ISK
            budgetAmount: 7500,
            season: 'Middle',
        },
    ]);
    const [tripsExist, setTripsExist] = useState<boolean>(true);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [tripSelected, setTripSelected] = useState<string>('');
    
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
        if (tripSelected == '*' || tripSelected == '' ) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }

    }, [tripSelected])
      
    useEffect(() => {
        //loadTrips();
    }, [])
    
    return (
        <BodyPage>
            <TopPage>
                <GoBack to="home"/>
            </TopPage>
            <MiddlePage>
                <div className="mx-[8.8vw] mt-[6vw] xs:mx-[15.5vw] xs:my-[7vw] lg:my-0 lg:mt-[1vw] lg:mx-[7vw] lg:mb-[4vw]">
                    <img
                        src={Image}
                        className="w-full h-auto"
                    />
                </div>
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
                    <div className="flex items-center mt-[1.3vw]">
                    <Select defaultValue={trips.length === 0 ? "*" : ""} onValueChange={(e) => setTripSelected(e)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Your Trip" />
                        </SelectTrigger>
                        <SelectContent className="h-[16vw]">
                            <SelectGroup>
                            {tripsExist ? (
                                trips.map((trip: Trip) => (
                                <SelectItem key={trip.id} value={trip.id}>
                                    <p className="text-[0.8vw] text-gray-900">
                                    {trip.tripName} - {trip.period}
                                    </p>
                                </SelectItem>
                                ))
                            ) : (
                                <SelectItem value="*">No trips created yet</SelectItem>
                            )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex h-10  items-center justify-between border rounded-r-md border-t-2 border-b-2 border-r-2 border-l-1 border-[#bfbfbf] bg-transparent px-2 py-1 border-[#bfbfbf] text-sm ring-offset-background placeholder:text-muted-foreground hover:border-[#707070] hover:border-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 data-[state=open]:border-2 data-[state=open]:border-[#707070] data-[state=open]:text-accent-foreground">
                            <MoreHorizontal />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Trip Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem disabled={isDisabled}>Edit</DropdownMenuItem>
                            <DropdownMenuItem disabled={isDisabled}>Delete</DropdownMenuItem>
                            <DropdownMenuItem disabled={isDisabled}>Duplicate</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
                    <div className="w-full mt-[0.8vw]">
                        <Button size={"card"} disabled={false}>
                            Access This Trip
                        </Button>
                    </div>
                    {
                        tripsExist ?
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
                    <Toaster />
                </div>
            </MiddlePage>
            <BottomPage>
                <Credits/>
            </BottomPage>
        </BodyPage>          
    )
}
