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
import { Link, useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { setItemSessionStorage } from "@/components/utils/utils";

export function ViewTrips() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [tripsExist, setTripsExist] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [tripSelected, setTripSelected] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();

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
            toast({
                variant: 'destructive',
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });

            console.error(error);
        }
    };

    const handleSubmit = () => {
        try {
            setItemSessionStorage('tripId', tripSelected);
            navigate('/tripDetails');
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });

            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await deleteTrip(tripSelected);

            if (response.success) {
                loadTrips();
                setTripSelected('')
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
            const response = await duplicateTrip(tripSelected as string);

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
      
    useEffect(() => {
        loadTrips();
    }, []);
    
    return (
        <BodyPage>
            <TopPage>
                <GoBack to={'home'} />
            </TopPage>
            <MiddlePage> 
                <div className="hidden lg:block mx-[2vw]">
                    <img
                        src={Image}
                        className="w-auto h-auto"
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="lg:hidden mx-[17vw] xxs3:mx-[8.8vw] xs:mx-[24vw] sm:mx-[20.5vw] my-[2vw] xxs5:my-[2vw] xxs3:my-[2.4vw] xs:my-[2vw] sm:my-[3vw]">
                        <img
                            src={Image}
                            className="w-auto h-auto"
                        />
                    </div>
                    <div className='table mx-auto mb-[5vw] mt-[3vw] xs:mb-0'>
                        <div>
                            <h1 className="grid text-center text-[18.5vw] xxs5:text-[18vw] xs:text-[12.7vw] lg:text-[6.1vw] w-full text-gray-900 tracking-tight leading-[0.9]">
                                Your Trips!
                            </h1>
                        </div>
                        <div>
                            <p className='text-center text-[7.2vw] xxs8:text-[6.9vw] xs:text-[4.79vw] lg:text-[1.8vw] mt-[4.5vw] xxs5:mt-[4.2vw] xs:mt-[2.8vw] lg:mt-[1vw] leading-tight text-gray-900 tracking-tight'>
                                All your journeys in one place.
                            </p>
                        </div>
                        <div className="flex items-center mt-[4vw] xxs5:mt-[4vw] xs:mt-[2vw] lg:mt-[1.2vw]">
                            <Select 
                                defaultValue={trips.length === 0 ? "*" : ""}
                                value={tripSelected}
                                onValueChange={(e) => setTripSelected(e)} 
                                open={isOpen} 
                                onOpenChange={setIsOpen}
                            >
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Select Your Trip">
                                        <div>
                                        <p className="text-[3.4vw] xxs3:text-[3.2vw] xs:text-[2.4vw] lg:text-base breaK-all">
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
                            <Button size={"card"} disabled={isDisabled}>
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
                </form>
            </MiddlePage>
            <BottomPage>
                <Credits/>
            </BottomPage>
        </BodyPage>          
    )
}
