import Credits from "@/components/Credits";
import { GoBack } from "@/components/GoBack";
import { BodyPage, BottomPage, MiddlePage, TopPage } from "@/components/LayoutPage/Layouts";
import Image from "../assets/undraw_adventure-map_8hg8.svg"
import { useEffect, useState } from "react";
import { Trip } from "@/types/types";
import { Button } from "@/components/ui/button";
import { deleteTrip, duplicateTrip, getTrips } from "@/service/service";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectTriggerInput, SelectValue } from "@/components/ui/select";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { setItemSessionStorage } from "@/components/utils/utils";

export function ViewTrips() {
    
    const [trips, setTrips] = useState<Trip[]>([
            {
                id: '7101923785401883001',
                tripName: 'WWWWWWWWWWWWWWWWWWWWWW',
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
            }
    ]);
    const [tripsExist, setTripsExist] = useState<boolean>(true);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [tripSelected, setTripSelected] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const loadTrips = async () => {
        try {
            const response = await getTrips();

            if (response.success) {
                setTrips([response.data]);
                
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
            toast({
                variant: 'destructive',
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        }
    };

    const handleDelete = async () => {
        try {
            const response = await deleteTrip(BigInt(tripSelected) as bigint);

            if (response.success) {
                loadTrips();
                toast({
                    variant: 'success',
                    title: 'Trip deleted successfully!',
                    description: 'Your trip has been deleted. It is no longer in your list.',
                });
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

    const handleDublicate = async () => {
        try {
            const response = await duplicateTrip(BigInt(tripSelected) as bigint);

            if (response.success) {
                loadTrips();
                toast({
                    variant: 'success',
                    title: 'Trip duplicated successfully!',
                    description: 'Your trip has been duplicated and is now in your list.',
                });
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
    }

    useEffect(() => {
        if (tripSelected == '*' || tripSelected == '' ) {
            setIsDisabled(true);
            localStorage.removeItem('tripId');
        } else {
            setIsDisabled(false);
            setItemSessionStorage('tripId', tripSelected);
        }

    }, [tripSelected]);
      
    useEffect(() => {
        //loadTrips();
    }, []);
    
    return (
        <BodyPage>
            <TopPage>
                <GoBack to="home"/>
            </TopPage>
            <MiddlePage>
            <div className="hidden lg:block mx-[2vw]">
                    <img
                        src={Image}
                        className="w-auto h-auto"
                    />
                </div>
                <div>
                    <div className="lg:hidden mx-[17vw] xxs3:mx-[8.8vw] xs:mx-[20.5vw] sm:mx-[15.5vw] my-[2vw] xxs5:my-[2vw] xxs3:my-[2.4vw] xs:my-[2vw] sm:my-[3vw]">
                        <img
                            src={Image}
                            className="w-auto h-auto"
                        />
                    </div>
                    <div className='table mx-auto mb-[5vw] mt-[3vw] xs:mb-0'>
                        <div>
                            <h1 className="grid text-center text-[18.5vw] xxs5:text-[18vw] xs:text-[12.7vw] lg:text-[6.2vw] w-full text-gray-900 tracking-tight leading-[0.9]">
                                Your Trips!
                            </h1>
                        </div>
                        <div>
                            <p className='text-center text-[7.2vw] xxs8:text-[6.9vw] xs:text-[4.9vw] lg:text-[1.8vw] mt-[4.5vw] xxs5:mt-[4.2vw] xs:mt-[2.8vw] lg:mt-[1vw] leading-tight text-gray-900 tracking-tight'>
                                All your journeys in one place.
                            </p>
                        </div>
                        <div className="flex items-center mt-[4vw] xxs5:mt-[4vw] xs:mt-[2vw] lg:mt-[1.2vw]">
                            <Select 
                                defaultValue={trips.length === 0 ? "*" : ""} 
                                onValueChange={(e) => setTripSelected(e)} 
                                open={isOpen} 
                                onOpenChange={setIsOpen}
                            >
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Select Your Trip">
                                        <div>
                                        <p className="text-[3.4vw] xxs3:text-[3.2vw] xs:text-[2.4vw] lg:text-[1vw] breaK-all">
                                        {tripSelected 
                                            ? trips.find((trip) => trip.id === tripSelected)?.tripName 
                                            : "Select Your Trip"}
                                        </p>
                                        </div>
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent className={`${tripsExist ? 'max-h-[70vw] lg:h-[16vw]' : null}`}>
                                    <SelectGroup>
                                        {tripsExist ? (
                                            trips.map((trip: Trip) => (
                                                <SelectItem key={trip.id} value={trip.id}>
                                                    <p className="text-gray-900">
                                                        {trip.tripName}
                                                    </p>
                                                    <p>
                                                        {isOpen ? `${trip.period}` : null}
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
                                <DropdownMenuTrigger className="flex h-10 items-center justify-between border rounded-r-md border-t-2 border-b-2 border-r-2 border-l-1 border-[#bfbfbf] bg-transparent px-1 xs:px-2 py-1 border-[#bfbfbf] text-sm ring-offset-background placeholder:text-muted-foreground hover:border-[#707070] hover:border-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 data-[state=open]:border-2 data-[state=open]:border-[#707070] data-[state=open]:text-accent-foreground">
                                    <MoreHorizontal className="w-4 h-auto"/>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Trip Options</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem disabled={isDisabled} onClick={(e) => e.preventDefault()}>
                                        <Link to={'/editTrip'} onClick={() => setItemSessionStorage('tripId', tripSelected)}>
                                            Edit
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem disabled={isDisabled} onClick={(e) => e.preventDefault()}>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <p>Delete</p>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete your trip and remove 
                                                        all related data from our system.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={handleDelete}>Delete Trip</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem disabled={isDisabled} onClick={handleDublicate}>
                                        <p>Duplicate</p>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="w-full mt-[3vw] xs:mt-[2vw] lg:mt-[0.7vw]">
                            <Button size={"card"} disabled={false}>
                                Access This Trip
                            </Button>
                        </div>
                        <div className="flex justify-center items-center gap-1.5 w-full text-[4vw] xxs5:text-sm mt-[0.9vw] sm:text-base lg:text-lg">
                            <p>
                                { tripsExist ? 'Want to create another trip?' : 'Ready to plan your first trip?'}
                            </p>
                            <Link to={"/addTrips"}>
                                <strong>
                                    Click here.
                                </strong>
                            </Link>
                        </div>
                        <Toaster />
                    </div>
                </div>
            </MiddlePage>
            <BottomPage>
                <Credits/>
            </BottomPage>
        </BodyPage>          
    )
}
