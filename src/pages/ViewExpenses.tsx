import Credits from "@/components/Credits";
import { GoBack } from "@/components/GoBack";
import { BodyPage, BottomPage, MiddlePageOneCol, TopPage } from "@/components/LayoutPage/Layouts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toaster } from "@/components/ui/toaster";
import { getItemSessionStorage } from "@/components/utils/utils";
import { toast } from "@/hooks/use-toast";
import { createExpense, deleteExpense, getExpenses, getTrip, updateExpense, } from "@/service/service";
import { AccomodationExpense, AirplaneExpense, AttractionExpense, DataButton, DataContent, DataForm, DialogOpen, Expense, FoodExpense, TransportationExpense, Trip } from "@/types/types";
import { error } from "console";
import { stat } from "fs";
import { BadgeInfo, Bed, BedSingle, Building, Bus, CalendarDays, CalendarIcon, Castle, ChevronDown, ChevronUp, Church, CircleHelp, Clock, Coffee, CookingPot, FerrisWheel, Fish, Flag, Home, Hotel, Info, Landmark, Link, MapPin, MoreHorizontal, Mountain, PawPrint, Pencil, Pizza, Plane, Plus, Puzzle, Receipt, Soup, Theater, Ticket, Timer, TreePine, Users, Utensils, Wallet, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const initialExpense = {
    id: '',
    tripId: '',
    type: '',
    amount: '0',
    countryCurrency: 'USD',
    day: 1,
}

export default function ViewExpenses() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState<number>(0);
    const [count, setCount] = useState<number>(0);
    const [trip, setTrip] = useState<Trip>();
    const [expense, setExpense] = useState<Expense>(initialExpense)
    const [expenses, setExpenses] = useState<Expense[]>([
        {
            id: '2343',
            tripId: '2',
            type: 'Food',
            name: 'Restaurant',
            category: 'Breakfast',
            place: 'whatever',
            countryCurrency: '$',
            amount: '1000',
            day: 3
        }
    ]);
    const [showContent, setShowContent] = useState<boolean | null>(null);
    const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});
    const [expenseType, setExpenseType] = useState<number>(0);
    const [status, setStatus] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState()
    const dataButton: DataButton[] = [
        {
            name: 'Airplane',
            href: '/expenses',
            nmr: 0,
            icon: <Plane />
        },
        {
            name: 'Transport',
            href: '/itinerary',
            nmr: 1,
            icon: <Bus />
        },
        {
            name: 'Food',
            href: '/toDoList',
            nmr: 2,
            icon: <Utensils />
        },
        {
            name: 'Attraction',
            href: '/toDoList',
            nmr: 3,
            icon: <FerrisWheel />
        },
        {
            name: 'Accomodation',
            href: '/myPiggyBank',
            nmr: 4,
            icon: <Hotel />
        },
    ];
    const dataForm: DataForm[] = [
        {
            operation: 'Create',
            type: 'Airplane',
            title: 'Create Flight Expense',
            subtitle: 'Track your flight costs effortlessly!',
            content: [
            { 
                label: 'Airline Name',
                status: status >= 2 && status <= 4 ? 'border-red-500' : '',
                name: 'name',
                element: 'input', 
                typeElement: 'text', 
                placeHolderElement: "Ex: Latam, Delta, Emirates", 
                valueElement: '' 
            }, 
            { 
                label: 'Origin',  
                status: status >= 10 && status <= 12 ? 'border-red-500' : '',
                name: 'origin',
                element: 'input', 
                typeElement: 'text', 
                placeHolderElement: "Ex: São Paulo, New York, Paris", 
                valueElement: '' 
            },
            { 
                label: 'Destination',  
                status: status >= 13 && status <= 15 ? 'border-red-500' : '',
                name: 'destination',
                element: 'input', 
                typeElement: 'text', 
                placeHolderElement: "Ex: Rio de Janeiro, Orlando", 
                valueElement: '' 
            },
          ]
        },
        {
            operation: 'Create',
            type: 'Transport',
            title: 'Create Transportation Expense',
            subtitle: 'Keep your transportation expenses in check!',
            content: [
            { 
                label: 'Category',  
                status: status == 5 ? 'border-red-500' : '',
                name: 'category',
                element: 'select', 
                typeElement: '', 
                placeHolderElement: "Select a category", 
                valueElement: ["Taxi", "Uber", "Rental car", "Bicycle", "Other"] 
            }, 
            { 
                label: 'Origin', 
                status: status >= 10 && status <= 12 ? 'border-red-500' : '', 
                name: 'origin',
                element: 'input', 
                typeElement: 'text', 
                placeHolderElement: "Ex: São Paulo, New York, Paris", 
              valueElement: '' 
            },
            { 
                label: 'Destination',
                status: status >= 13 && status <= 15 ? 'border-red-500' : '',
                name: 'destination',
                element: 'input', 
                typeElement: 'text', 
                placeHolderElement: "Ex: Rio de Janeiro, Orlando", 
                valueElement: '' 
            },
          ]
        },
        {
            operation: 'Create',
            type: 'Food',
            title: 'Create Food Expense',
            subtitle: 'Stay on top of your food expenses!',
            content: [
            { 
                label: 'Food Name',
                status: status >= 2 && status <= 4 ? 'border-red-500' : '',
                name: 'name',
                element: 'input', 
                typeElement: 'text', 
                placeHolderElement: "Ex: Pizza, Burguer, Salad", 
                valueElement: '' 
            },
            { 
                label: 'Category',
                status: status == 5 ? 'border-red-500' : '', 
                name: 'category',
                element: 'select',
                typeElement: '', 
                placeHolderElement: "Select a category", 
                valueElement: ["Breakfast", "Lunch", "Dinner", "Brunch", "Snack"]
            },
            { 
                label: 'Place',
                status: status >= 7 && status <= 9 ? 'border-red-500' : '', 
                name: 'place',
                element: 'input',
                typeElement: 'text', 
                placeHolderElement: "Ex: Restaurant, Supermarket, Food Truck", 
                valueElement: '' 
            },
          ]
        },
        {
            operation: 'Create',
            type: 'Attraction',
            title: 'Create Attraction Expense',
            subtitle: 'Track your entertainment costs easily!',
            content: [
            { 
                label: 'Attraction Name',  
                status: status >= 2 && status <= 4 ? 'border-red-500' : '',
                name: 'name',
                element: 'input', 
                typeElement: 'text', 
                placeHolderElement: "Ex: Statue of Liberty, Eiffiel Tower", 
                valueElement: '' 
            }, 
            { 
                label: 'Category',  
                status: status == 5 ? 'border-red-500' : '',
                name: 'category',
                element: 'select', 
                typeElement: '', 
                placeHolderElement: "Select a category", 
                valueElement: [
                    "Museum", "Park", "Event", "Theater", "Zoo", 
                    "Aquarium", "Restaurant", "Nature Reserve", 
                    "Historical Site", "Religious Site", "Others"
                ] 
            },
            { 
              label: 'Duration',  
              status: status == 6 ? 'border-red-500' : '',
              name: 'duration',
              element: 'select', 
              typeElement: '', 
              placeHolderElement: "Select the duration", 
              valueElement: ["30min", "1h", "1h 30min", "2h", "2h 30min", "3h", "3h 30min", "4h", "More than 4h"]
            },
          ]
        },
        {
            operation: 'Create',
            type: 'Accomodation',
            title: 'Create Accomodation Expense',
            subtitle: 'Take charge of your accommodation spending!',
            content: [
            { 
                label: 'Accomodation Name',  
                status: status >= 2 && status <= 4 ? 'border-red-500' : '',
                name: 'name',
                element: 'input', 
                typeElement: 'text', 
                placeHolderElement: "Ex: Burj Al Arab, The Plaza Hotel", 
                valueElement: '' 
            }, 
            { 
                label: 'Category',  
                status: status >= 5 ? 'border-red-500' : '',
                name: 'category',
                element: 'select', 
                typeElement: '', 
                placeHolderElement: "Select a category", 
                valueElement: ["Hotel", "Hostel", "Airbnb", "Guesthouse", "Other"] 
            },
            { 
                label: 'Duration of Stay',  
                status: status == 6 ? 'border-red-500' : '',
                name: 'duration',
                element: 'select', 
                typeElement: '', 
                placeHolderElement: "Select a duration", 
                valueElement: Array.from({ length: Number(trip?.daysQty) }).map((_, index) => `${index + 1} Day`)
            },
          ]
        },
    ];

    const loadTrip = async () => {
        try {
            const route: string | null = getItemSessionStorage('currentPath');
            const tripData: Trip | null = getItemSessionStorage('trip');

            if (!route) {
                throw new Error("Route is missing")
            }

            if (!tripData) {
                throw new Error("Trip is missing")
            }
            
            setTrip(tripData);
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
            console.error(error);
        }
    }

    const loadExpenses = async () => {
        try {
            const response = await getExpenses(trip?.id as string);
            
            if (response.success) {
                setExpenses(response.data);
            } else {
                throw new Error("The request failed. Please check the data and try again.");
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
    };

    const NumberFormatted = (amount: number): string => {
        
            
        if (!isNaN(amount)) {

            const formatted = amount.toLocaleString('en-US', {
                maximumFractionDigits: 2,
            });
      
            return formatted;
        } 

        return '';
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const symbol = getCurrencySymbol(expense.countryCurrency);
      
        if (!inputValue.startsWith(symbol) || inputValue.length < symbol.length) {
            return;
        }

        let rawValue = inputValue.substring(symbol.length).trim();
      
        let cleanedValue = rawValue.replace(/,/g, '');
      
        if (cleanedValue === '' || cleanedValue === '.') {
            setExpense({ ...expense, amount: '0' });
            return;
        }
      
        const nativeEvent = e.nativeEvent as InputEvent;

        if (nativeEvent.inputType === 'deleteContentBackward' ) {
            setExpense({ ...expense, amount: inputValue.replace(symbol, '') });
            return;
        }
      
      
        if (cleanedValue.includes('.')) {
            let [integerPart, decimalPart] = cleanedValue.split('.');

            if (decimalPart.length > 2) {
                decimalPart = decimalPart.substring(0, 2);
                cleanedValue = integerPart + '.' + decimalPart;
            }
        }
      
        const numericValue = parseFloat(cleanedValue);
      
        if (!isNaN(numericValue)) {
            const endsWithDot = rawValue.endsWith('.');

            let formatted = numericValue.toLocaleString('en-US', {
                maximumFractionDigits: 2,
                minimumFractionDigits: (rawValue.includes('.') && !endsWithDot) ? 2 : 0,
            });
      
            if (endsWithDot && !formatted.includes('.')) {
                formatted += '.';
            }

            setExpense({ ...expense, amount: formatted });
        } else {
            setExpense({ ...expense, amount: '0' });
        }
    };
      
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string) => {
        if (typeof e != 'string') {
            setExpense(
                {...expense, [e.target.name]: e.target.value}
            );
        } else {
            setExpense(
                {...expense, category: e}
            );
        }
    };

    const handleCreate = async () => {
        try {
            setIsLoading(true);
            const response = await createExpense(expense);

            if (response.success) {
                setExpense(initialExpense);
                loadExpenses();
                setStatus(1);
            }  else {
                if (response.error == "Error: the value of name is invalid or was not provided correctly") {
                    setStatus(2);
                } else if (response.error == "Error: the value of name is too short!") {
                    setStatus(3);
                } else if (response.error = "Error: the value of name is too large!") {
                    setStatus(4)
                } else if (response.error = "Error: the value of category is invalid or was not provided correctly") {
                    setStatus(5);
                } else if (response.error = "Error: the value of duration is invalid or was not provided correctly") {
                    setStatus(6);
                } else if (response.error = "Error: the value of place is invalid or was not provided correctly") {
                    setStatus(7);
                } else if (response.error = "Error: the value of place is too short!") {
                    setStatus(8);
                } else if (response.error = "Error: the value of place is too large!") {
                    setStatus(9);
                } else if (response.error = "Error: the value of origin is invalid or was not provided correctly") {
                    setStatus(10);
                }else if (response.error = "Error: the value of origin is too short!") {
                    setStatus(11);
                } else if (response.error = "Error: the value of origin is too large!") {
                    setStatus(12);
                } else if (response.error = "Error: the value of destination is invalid or was not provided correctly") {
                    setStatus(13);
                }else if (response.error = "Error: the value of destination is too short!") {
                    setStatus(14);
                } else if (response.error = "Error: the value of destination is too large!") {
                    setStatus(15);
                } else if (response.error = "Error: the value of amount is invalid or was not provided correctly") {
                    setStatus(16);
                } else if (response.error = "Error: the value of amount is less or equal than zero!") {
                    setStatus(17); 
                } else if (response.error = "Error: the value of amount is too large!") {
                    setStatus(18);
                } else if (response.error = "Error: the format of amount is invalid! Only up to two decimal places are allowed.") {             
                    setStatus(19);
                } else if (response.error = "Error: the value of day is invalid or was not provided correctly") {
                    setStatus(20)
                } else {
                    throw new Error("The request failed. Please check the data and try again.");
                }
            }
        } catch (error: any) {
            setStatus(21);
            console.error(error);
        } finally {
            setIsLoading(false);
            setShowToast(true);
        }
    }

    const handleUpdate = async () => {
        try {
            setIsLoading(true);
            const response = await updateExpense(expense as Expense);

            if (response.success) {
                loadExpenses();
                setStatus(1);
            } else {
                if (response.error == "Error: the value of name is invalid or was not provided correctly") {
                    setStatus(2);
                } else if (response.error == "Error: the value of name is too short!") {
                    setStatus(3);
                } else if (response.error = "Error: the value of name is too large!") {
                    setStatus(4)
                } else if (response.error = "Error: the value of category is invalid or was not provided correctly") {
                    setStatus(5);
                } else if (response.error = "Error: the value of duration is invalid or was not provided correctly") {
                    setStatus(6);
                } else if (response.error = "Error: the value of place is invalid or was not provided correctly") {
                    setStatus(7);
                } else if (response.error = "Error: the value of place is too short!") {
                    setStatus(8);
                } else if (response.error = "Error: the value of place is too large!") {
                    setStatus(9);
                } else if (response.error = "Error: the value of origin is invalid or was not provided correctly") {
                    setStatus(10);
                }else if (response.error = "Error: the value of origin is too short!") {
                    setStatus(11);
                } else if (response.error = "Error: the value of origin is too large!") {
                    setStatus(12);
                } else if (response.error = "Error: the value of destination is invalid or was not provided correctly") {
                    setStatus(13);
                }else if (response.error = "Error: the value of destination is too short!") {
                    setStatus(14);
                } else if (response.error = "Error: the value of destination is too large!") {
                    setStatus(15);
                } else if (response.error = "Error: the value of amount is invalid or was not provided correctly") {
                    setStatus(16);
                } else if (response.error = "Error: the value of amount is less or equal than zero!") {
                    setStatus(17); 
                } else if (response.error = "Error: the value of amount is too large!") {
                    setStatus(18);
                } else if (response.error = "Error: the format of amount is invalid! Only up to two decimal places are allowed.") {             
                    setStatus(19);
                } else {
                    throw new Error("The request failed. Please check the data and try again.");
                }
            }
        } catch (error: any) {
            setStatus(21);
            console.error(error);
        } finally {
            setIsLoading(false);
            setShowToast(true);
        }
    }

    const handleDelete = async (expenseId: string) => {
        try {
            setIsLoading(true);
            const response = await deleteExpense(trip?.id as string, expenseId as string);

            if (response.success) {
                setStatus(1);
                loadExpenses();
            } else {
                throw new Error("The request failed. Please check the data and try again.");
            }
        } catch (error: any) {
            setStatus(20);
            console.error(error);
        } finally {
            setIsLoading(false);
            setShowToast(true);
        }
    }

    useEffect(() => {
        if (!isLoading && showContent) {
            if (status == 1) {
                toast({
                    variant: 'success',
                    title: `${dataForm[expenseType].type} created successfully!`,
                    description: `Your ${dataForm[expenseType].type.toLowerCase()} is now set! Get ready for your next adventure.`,
                });
            } else if (status == 2) {
                toast({
                    variant: 'destructive',
                    title: `Invalid ${dataForm[expenseType].type} Name`,
                    description: `The ${dataForm[expenseType].type.toLowerCase()} you entered is invalid. Please check and try again.`,
                }); 

            } else if (status == 3) {
                toast({
                    variant: 'destructive',
                    title: `${dataForm[expenseType].type} Name Too Short`,
                    description: `Your ${dataForm[expenseType].type.toLowerCase()} name is too short. Please enter a shorter name.`,
                });
                
            } else if (status == 4) {
                toast({
                    variant: 'destructive',
                    title: `${dataForm[expenseType].type} Too Long`,
                    description: `Your ${dataForm[expenseType].type.toLowerCase()} is too long. Please enter a shorter name.`,
                });

            } else if (status == 5) {
                toast({
                    variant: 'destructive',
                    title: `Invalid Category`,
                    description: `The category you entered is invalid. Please check and try again.`,
                }); 

            } else if (status == 6) {
                toast({
                    variant: 'destructive',
                    title: `Invalid Duration`,
                    description: `The duration you entered is invalid. Please check and try again.`,
                });

            } else if (status == 7) {
                toast({
                    variant: 'destructive',
                    title: `Invalid Place`,
                    description: `The place you entered is invalid. Please check and try again.`,
                });

            } else if (status == 8) {
                toast({
                    variant: 'destructive',
                    title: `Place Too Short`,
                    description: `Your place is too short. Please enter a shorter place.`,
                });

            } else if (status == 9) {
                toast({
                    variant: 'destructive',
                    title: `Place Too Long`,
                    description: `Your place is too long. Please enter a shorter place.`,
                });

            } else if (status == 10) {
                toast({
                    variant: 'destructive',
                    title: `Invalid Origin`,
                    description: `The origin you entered is invalid. Please check and try again.`,
                });

            }else if (status == 11) {
                toast({
                    variant: 'destructive',
                    title: `Origin Too Short`,
                    description: `Your origin is too short. Please enter a shorter origin.`,
                });

            } else if (status == 12) {
                toast({
                    variant: 'destructive',
                    title: `Origin Too Long`,
                    description: `Your origin is too long. Please enter a shorter origin.`,
                });

            } else if (status == 13) {
                toast({
                    variant: 'destructive',
                    title: `Invalid Destination`,
                    description: `The destination you entered is invalid. Please check and try again.`,
                });

            }else if (status == 14) {
                toast({
                    variant: 'destructive',
                    title: `Destination Too Short`,
                    description: `Your destination is too short. Please enter a shorter destination.`,
                });

            } else if (status == 15) {
                toast({
                    variant: 'destructive',
                    title: `Destination Too Long`,
                    description: `Your destination is too long. Please enter a shorter destination.`,
                });

            } else if (status == 16) {
                toast({
                    variant: 'destructive',
                    title: `Invalid Amount`,
                    description: `The destination you entered is invalid. Please check and try again.`,
                });

            } else if (status == 17) {
                toast({
                    variant: 'destructive',
                    title: `Amount Less or Equal than Zero`,
                    description: `The amount you entered is less or equal than zero. Please check and try again.`,
                });
                
            } else if (status == 18) {
                toast({
                    variant: 'destructive',
                    title: `Amount Too Large`,
                    description: `Your amount is too large. Please enter a shorter amount.`,
                });

            } else if (status == 19) {
                toast({
                    variant: 'destructive',
                    title: `Invalid Amount Format`,
                    description: `The amount must have at most two decimal places. Please enter a valid amount like 10.00 or 5.5.`,
                });

            } else if (status == 20) {
                toast({
                    variant: 'destructive',
                    title: `Invalid Day`,
                    description: `The day you entered is invalid. Please check and try again.`,
                });

            } else {
                toast({
                    variant: 'destructive',
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                });
            }
        }

        setShowToast(false);
    }, [isLoading, showContent, status]);

    useEffect(() => {
        if (trip) {
            setExpense({...expense, tripId: trip.id, type: dataForm[expenseType].type});
        }
    }, [expense, expenseType])

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
        if (trip) {
            loadExpenses();
        }
    }, [trip]);
    
    useEffect(() => {
        loadTrip();
    }, []);

    return (
        <BodyPage>
            <TopPage>
                <GoBack to={'selectTrip'} />
            </TopPage>
            <MiddlePageOneCol>
                <div className="grid place-items-center items-center" >
                    <div>
                        <h1 className="grid text-[14.6vw] xxs5:text-[14.1vw] xs:text-[12vw] lg:text-[4.6vw] w-full text-gray-900 tracking-tight leading-[0.6] xxs3:leading-[0.7]">
                            Trip Expenses
                        </h1>
                    </div>
                    <div>
                        <p  className="text-[7.1vw] xxs8:text-[6.7vw] xs:text-[5.8vw] lg:text-[1.68vw] mt-[3.7vw] xxs5:mt-[4.9vw] xxs3:mt-[5.2vw] xs:mt-[3.7vw] lg:mt-[1.1vw] leading-tight text-gray-900 tracking-tight">
                            Track your trip, stay on budget!
                        </p>
                    </div>
                    <div className="w-full grid gap-y-3 mt-[5vw] xs:mt-[2.6vw] xxs5:mt-[4.3vw] lg:mt-[0.7vw]" >
                        {
                            showContent == true ?
                            expenses.length > 0 ?
                            <div className="w-full">
                                <ScrollArea className={`grid -mr-10 ${expenses.length < 4 ? 'h-auto' : 'h-[92vw] xxs5:h-[68vw] xs:h-[48vw] md:h-[33.5vw] lg:h-[18.6vw]' } w-[96vw] xxs10:w-[96.5vw] xxs8:w-[90.7vw] xxs5:w-[90.1vw] xxs2:w-[89.5vw] xs:w-[77vw] md:w-[76.3vw] lg:w-[26.4vw] mt-[1vw]`}>
                                    <div className="relative">
                                        {
                                            expenses.map((obj: Expense, index: number) => (
                                                <Card key={index} className={`px-2 py-1 ${index != 0 && index != expenses.length - 1 ? 'my-3' : null} mr-3`}>
                                                    <div className="flex justify-between items-center m-0 p-0">
                                                        {
                                                            obj.type == "Airplane" ?
                                                            <>
                                                                <Plane strokeWidth={1.5} className="w-10 xxs5:w-12 xxs5:w-13 h-auto pr-2 lg:pr-0 lg:mr-3"/>
                                                                <div className="w-full grid place-items-start xxs5:gap-0.5 lg:gap-1">
                                                                    <p className="break-all text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                        <strong>
                                                                            { obj.name }
                                                                        </strong>
                                                                    </p>
                                                                    <p className="flex gap-0.5 xs:gap-1 text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                        <MapPin className="w-3 lg:w-5 h-auto"/>
                                                                        { obj.origin }
                                                                    </p>
                                                                    <p className="flex gap-0.5 xs:gap-1 text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                        <Flag className="w-3 lg:w-5 h-auto"/>
                                                                        { obj.destination }
                                                                    </p>
                                                                    <div className="w-full grid xxs5:flex justify-between pr-2">
                                                                        <div className="flex gap-1.5">
                                                                            <Wallet className="w-3 lg:w-5 h-auto"/>
                                                                            <p className="break-all text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                                { obj.countryCurrency }{ obj.amount }
                                                                            </p>
                                                                        </div>
                                                                        <div className="flex gap-0.5 xs:gap-1"><CalendarIcon className="w-3 lg:w-5 h-auto"/>
                                                                            <p className="text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                                Day { obj.day }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </> : 
                                                            obj.type == "Transportation" ?
                                                            <>
                                                                <Bus strokeWidth={1.5} className="w-10 xxs5:w-12 xxs5:w-13 h-auto pr-2 lg:pr-0 lg:mr-3"/>
                                                                <div className="w-full grid place-items-start xxs5:gap-0.5 lg:gap-1 text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                    <p className="break-all">
                                                                        <strong>
                                                                            { obj.category }
                                                                        </strong>
                                                                    </p>
                                                                    <p className="flex gap-0.5 xs:gap-1 text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                        <MapPin className="w-3 lg:w-5 h-auto"/>
                                                                        { obj.origin }
                                                                    </p>
                                                                    <p className="flex gap-0.5 xs:gap-1 text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                        <Flag className="w-3 lg:w-5 h-auto"/>
                                                                        { obj.destination }
                                                                    </p>
                                                                    <div className="w-full grid xxs5:flex justify-between pr-2">
                                                                        <div className="flex gap-1.5">
                                                                            <Wallet className="w-3 lg:w-5 h-auto"/>
                                                                            <p className="break-all text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                                { obj.countryCurrency }{ obj.amount }
                                                                            </p>
                                                                        </div>
                                                                        <div className="flex gap-0.5 xs:gap-1">
                                                                            <CalendarIcon className="w-3 lg:w-5 h-auto"/>
                                                                            <p className="text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                                Day { obj.day }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </> :
                                                            obj.type == "Food" ?
                                                            <>
                                                                <Utensils strokeWidth={1.5} className="w-10 xxs5:w-12 xxs5:w-13 h-auto pr-2 lg:pr-0 lg:mr-3"/>
                                                                <div className="w-full grid place-items-start xxs5:gap-0.5 lg:gap-1 text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                    <p className="break-all">
                                                                        <strong>
                                                                            { obj.name }
                                                                        </strong>
                                                                    </p>
                                                                    <div className="flex gap-0.5 xs:gap-1">
                                                                        { obj.category == 'Breakfast' ?
                                                                        <Coffee className="w-3 lg:w-5 h-auto"/> :
                                                                        obj.category == 'Snack' ?
                                                                        <Pizza className="w-3 lg:w-5 h-auto"/>  :
                                                                        obj.category == 'Lunch' ?
                                                                        <CookingPot className="w-3 lg:w-5 h-auto"/>  :
                                                                        obj.category == 'Dinner' ?
                                                                        <Soup className="w-3 lg:w-5 h-auto"/>  : null
                                                                        } 
                                                                        <p className="break-all">
                                                                            { obj.category }
                                                                        </p>
                                                                    </div>
                                                                    <p className="flex gap-0.5 xs:gap-1 text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                        <MapPin className="w-3 lg:w-5 h-auto"/>
                                                                        { obj.place }
                                                                    </p> 
                                                                    <div className="w-full grid xxs5:flex justify-between pr-2">
                                                                        <div className="flex gap-1.5">
                                                                            <Wallet className="w-3 lg:w-5 h-auto"/>
                                                                            <p className="break-all text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                                { obj.countryCurrency }{ obj.amount }
                                                                            </p>
                                                                        </div>
                                                                        <div className="flex gap-0.5 xs:gap-1">
                                                                            <CalendarIcon className="w-3 lg:w-5 h-auto"/>
                                                                            <p className="text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                                Day { obj.day }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </> : 
                                                            obj.type == "Attraction" ?
                                                            <>
                                                                <FerrisWheel strokeWidth={1.5} className="w-10 xxs5:w-12 xxs5:w-13 h-auto pr-2 lg:pr-0 lg:mr-3"/>
                                                                <div className="w-full grid place-items-start xxs5:gap-0.5 lg:gap-1 text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                    <p className="break-all">
                                                                        <strong>
                                                                            { obj.name }
                                                                        </strong>
                                                                    </p>
                                                                    <div className="flex gap-0.5 xs:gap-1">
                                                                        { obj.category == 'Museum' ? 
                                                                        <Landmark className="w-3 lg:w-5 h-auto" /> :
                                                                        obj.category == 'Park' ? 
                                                                        <TreePine className="w-3 lg:w-5 h-auto" /> :
                                                                        obj.category == 'Event' ? 
                                                                        <Ticket className="w-3 lg:w-5 h-auto" /> :
                                                                        obj.category == 'Theater' ? 
                                                                        <Theater className="w-3 lg:w-5 h-auto" /> :
                                                                        obj.category == 'Zoo' ? 
                                                                        <PawPrint className="w-3 lg:w-5 h-auto" /> :
                                                                        obj.category == 'Aquarium' ? 
                                                                        <Fish className="w-3 lg:w-5 h-auto" /> :
                                                                        obj.category == 'Restaurant' ? 
                                                                        <Utensils className="w-3 lg:w-5 h-auto" /> :
                                                                        obj.category == 'Nature Place' ? 
                                                                        <Mountain className="w-3 lg:w-5 h-auto" /> :
                                                                        obj.category == 'Historical Place' ? 
                                                                        <Castle className="w-3 lg:w-5 h-auto" /> :
                                                                        obj.category == 'Religious Place' ? 
                                                                        <Church className="w-3 lg:w-5 h-auto" /> :
                                                                        obj.category == 'Others' ? 
                                                                        <Puzzle className="w-3 lg:w-5 h-auto" /> : null 
                                                                        }
                                                                        <p className="break-all">
                                                                            { obj.category }
                                                                        </p>
                                                                    </div>
                                                                    <p className="flex gap-0.5 xs:gap-1 text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                        <Timer className="w-3 lg:w-5 h-auto"/>
                                                                        { obj.duration }
                                                                    </p>
                                                                    <div className="w-full grid xxs5:flex justify-between pr-2">
                                                                        <div className="flex gap-1.5">
                                                                            <Wallet className="w-3 lg:w-5 h-auto"/>
                                                                            <p className="break-all text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                                { obj.countryCurrency }{ obj.amount }
                                                                            </p>
                                                                        </div>
                                                                        <div className="flex gap-0.5 xs:gap-1">
                                                                            <CalendarIcon className="w-3 lg:w-5 h-auto"/>
                                                                            <p className="text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                                Day { obj.day }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </> : 
                                                            obj.type == "Accomodation" ?
                                                            <>
                                                                <Hotel strokeWidth={1.5} className="w-10 xxs5:w-12 xxs5:w-13 h-auto pr-2 lg:pr-0 lg:mr-3"/>
                                                                <div className="w-full grid place-items-start xxs5:gap-0.5 lg:gap-1 text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                    <p className="break-all">
                                                                        <strong>
                                                                            { obj.name }
                                                                        </strong>
                                                                    </p>
                                                                    <div className="flex gap-0.5 xs:gap-1">
                                                                        { obj.category == 'Hotel' ?  
                                                                        <Bed className="w-3 lg:w-5 h-auto"/> :  
                                                                        obj.category == 'Hostel' ?  
                                                                        <Users className="w-3 lg:w-5 h-auto"/>  :  
                                                                        obj.category == 'Airbnb' ?  
                                                                        <Home className="w-3 lg:w-5 h-auto"/>  :  
                                                                        obj.category == 'Guesthouse' ?  
                                                                        <Building className="w-3 lg:w-5 h-auto"/>  :  
                                                                        obj.category == 'Other' ?  
                                                                        <BedSingle className="w-3 lg:w-5 h-auto"/>  : null  
                                                                        }  
                                                                        <p className="break-all">
                                                                            { obj.category }
                                                                        </p>
                                                                    </div>
                                                                    <p className="flex gap-0.5 xs:gap-1 text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                        <Clock className="w-3 lg:w-5 h-auto"/>
                                                                        { obj.duration } Days
                                                                    </p>
                                                                    <div className="w-full grid xxs5:flex justify-between pr-2">
                                                                        <div className="flex gap-1.5">
                                                                            <Wallet className="w-3 lg:w-5 h-auto"/>
                                                                            <p className="break-all text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                                { obj.countryCurrency }{ obj.amount }
                                                                            </p>
                                                                        </div>
                                                                        <div className="flex gap-0.5 xs:gap-1">
                                                                            <CalendarIcon className="w-3 lg:w-5 h-auto"/>
                                                                            <p className="text-[4vw] xxs5:text-[3vw] xs:text-sm">
                                                                                Day { obj.day }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </> : null
                                                        }
                                                        <div className="grid xxs5:flex justify-center gap-1.5">
                                                            
                                                            <Dialog>
                                                                <DialogTrigger asChild>
                                                                    <Button variant={'outline'} className="w-6 h-6 xxs5:w-8 xxs5:h-8 lg:w-9 lg:h-9 p-0"
                                                                        onClick={() => {
                                                                            setExpenseType(dataForm.findIndex((item: DataForm) => item.type == obj.type));
                                                                        }}
                                                                    >
                                                                        <Pencil className="w-3 xxs5:w-4 lg:w-5 h-auto p-0"/>
                                                                    </Button>
                                                                </DialogTrigger>
                                                                <DialogContent className="w-full sm:max-w-[425px]">
                                                                    <DialogHeader>
                                                                        <DialogTitle>
                                                                            {dataForm[expenseType].title}
                                                                        </DialogTitle>
                                                                        <DialogDescription>
                                                                            {dataForm[expenseType].subtitle}
                                                                        </DialogDescription>
                                                                    </DialogHeader>
                                                                        <form
                                                                            className="grid gap-2"
                                                                            onSubmit={(e) => {
                                                                                e.preventDefault();
                                                                                handleUpdate();
                                                                            }}
                                                                        >
                                                                            {dataForm[expenseType].content.map((c: DataContent) => (
                                                                                <div key={c.label} className="w-full">
                                                                                    <Label htmlFor={c.label}>
                                                                                        {c.label}
                                                                                    </Label>
                                                                                    {c.element === 'input' ? (
                                                                                    <Input
                                                                                        id={c.label}
                                                                                        name={c.name}
                                                                                        type={c.typeElement}
                                                                                        className={`p-2 ${c.status}`}
                                                                                        placeholder={c.placeHolderElement}
                                                                                        value={expense[c.name as keyof Expense] ? expense[c.name as keyof Expense] as string : ''}
                                                                                        onChange={handleChange}
                                                                                    />
                                                                                    ) : c.element === 'select' ? (
                                                                                    <Select
                                                                                        name={c.label.toLowerCase()}
                                                                                        open={!!isOpen[c.label]}
                                                                                        onOpenChange={(open) =>
                                                                                            setIsOpen((prev) => ({ ...prev, [c.label]: open }))
                                                                                        }
                                                                                        onValueChange={(value: string) =>
                                                                                            setExpense({ ...expense, [c.label.toLowerCase()]: value })
                                                                                        }
                                                                                    >
                                                                                        <SelectTrigger className="rounded-md border-r-2 p-3">
                                                                                            <SelectValue
                                                                                                placeholder={c.placeHolderElement}
                                                                                                className={c.status}
                                                                                            >
                                                                                                <p className="text-sm break-all">
                                                                                                    {expense[c.label.toLowerCase() as keyof Expense]}
                                                                                                </p>
                                                                                            </SelectValue>
                                                                                        </SelectTrigger>
                                                                                        <SelectContent>
                                                                                            <SelectGroup>
                                                                                                {
                                                                                                    Array.isArray(c.valueElement) &&
                                                                                                        c.valueElement.map((v: string, indexElement: number) => (
                                                                                                            <SelectItem key={indexElement} value={v}>
                                                                                                                {v}
                                                                                                            </SelectItem>
                                                                                                        ))
                                                                                                }
                                                                                            </SelectGroup>
                                                                                        </SelectContent>
                                                                                    </Select>
                                                                                    ) : null}
                                                                                </div>
                                                                            ))}
                                                                            <div>
                                                                                <Label htmlFor="Amount">
                                                                                    Amount
                                                                                </Label>
                                                                                <Input
                                                                                    id="Amount"
                                                                                    name="amount"
                                                                                    type="text"
                                                                                    className={`p-2 ${status >= 16 && status <= 19 ? 'border-red-500' : ''}`}
                                                                                    placeholder="How much is the expense?"
                                                                                    value={`${getCurrencySymbol(expense.countryCurrency)}${expense.amount}`}
                                                                                    onChange={handleChangeInput}
                                                                                />
                                                                            </div>
                                                                            <div>
                                                                                <Label htmlFor="day">Expense Day</Label>
                                                                                <Select
                                                                                    name="day"
                                                                                    defaultValue="1"
                                                                                    value={String(expense.day)}
                                                                                    onValueChange={(value: string) =>
                                                                                        setExpense({ ...expense, day: Number(value) })
                                                                                    }
                                                                                >
                                                                                    <SelectTrigger className="rounded-md border-r-2 p-3">
                                                                                        <SelectValue 
                                                                                            placeholder="Select a day" 
                                                                                            className={status == 20 ? 'border-red-500' : ''}
                                                                                        />
                                                                                    </SelectTrigger>
                                                                                    <SelectContent>
                                                                                    <SelectGroup>
                                                                                        {trip &&
                                                                                            Array.from({ length: trip.daysQty }).map((_, index) => (
                                                                                                <SelectItem key={index} value={String(index + 1)}>
                                                                                                    {index + 1}° Day
                                                                                                </SelectItem>
                                                                                            ))
                                                                                        }
                                                                                    </SelectGroup>
                                                                                    </SelectContent>
                                                                                </Select>
                                                                            </div>
                                                                        </form>
                                                                    <DialogFooter>
                                                                    <Button type="submit" size="lg">
                                                                        {dataForm[expenseType].operation}
                                                                    </Button>
                                                                    </DialogFooter>
                                                                </DialogContent>
                                                            </Dialog>
                                                            <Button className="w-6 h-6 xxs5:w-8 xxs5:h-8 lg:w-9 lg:h-9 p-0" onClick={() => handleDelete(obj.id)}>
                                                                <X className="w-3 xxs5:w-4 lg:w-5 h-auto p-0"/>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))
                                        }
                                    </div>
                                </ScrollArea>
                            </div> : 
                            <div>
                                <Card className="grid place-items-center p-5">
                                    <p>
                                        You do not have expenses yet on this trip.    
                                    </p>         
                                </Card>
                            </div> : null
                        }
                        <div className={`${showContent == false ? 'hidden' : ''} w-full`}>
                            <Button 
                                className={`w-full gap-2 flex justify-center ${showContent == true ? '' : ''}`} 
                                onClick={()=> {
                                    showContent == true ? setShowContent(null) : setShowContent(true)
                                }
                            }>
                                {
                                    showContent == true ?
                                    <>
                                        <X />
                                        Close
                                    </>
                                    :
                                    <>
                                        <Receipt />
                                        Show expanses
                                    </>
                                }
                            </Button>
                        </div>
                        {
                            showContent == false ?
                            <>
                                <div>
                                    <Label className="ml-1">
                                        Select the expanse type: 
                                    </Label>
                                    <Carousel opts={{align: "start" }} setApi={setApi} className="w-[87.8vw] xs:w-[61.5vw] lg:w-[24.73vw]">
                                        <CarouselContent className="w-full items-center -ml-1 lg:ml-0.4 ">
                                            {dataButton.map((obj, index) => (
                                            <CarouselItem key={index} className="pl-1.5 basis-1/2 cursor-pointer">
                                                <div className="w-full flex">
                                                    <Dialog
                                                        onOpenChange={(open) => {
                                                            if (!open) {
                                                                setExpense(initialExpense)
                                                            }

                                                            if (!open && document.activeElement instanceof HTMLElement) {
                                                                document.activeElement.blur();
                                                            }
                                                        }}
                                                    >
                                                        <DialogTrigger asChild>
                                                            <Button 
                                                                type="button"
                                                                className="w-full gap-2"
                                                                variant="outline"
                                                            >
                                                                {obj.icon}
                                                                {obj.name}
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="w-full sm:max-w-[425px]">
                                                            <DialogHeader>
                                                            <DialogTitle>{dataForm[index].title}</DialogTitle>
                                                            <DialogDescription>
                                                                {dataForm[index].subtitle}
                                                            </DialogDescription>
                                                            </DialogHeader>
                                                                <div className="grid gap-2">
                                                                    {dataForm[index].content.map((c: DataContent) => (
                                                                        <div key={c.label} className="w-full">
                                                                            <Label htmlFor={c.label}>
                                                                                {c.label}
                                                                            </Label>
                                                                            {c.element === 'input' ? (
                                                                            <Input
                                                                                id={c.label}
                                                                                name={c.name}
                                                                                type={c.typeElement}
                                                                                className={`p-2 ${c.status}`}
                                                                                placeholder={c.placeHolderElement}
                                                                                value={expense[c.name as keyof Expense] ? expense[c.name as keyof Expense] as string : ''}
                                                                                onChange={handleChange}
                                                                            />
                                                                            ) : c.element === 'select' ? (
                                                                            <Select
                                                                                name={c.label.toLowerCase()}
                                                                                open={!!isOpen[c.label]}
                                                                                onOpenChange={(open) =>
                                                                                    setIsOpen((prev) => ({ ...prev, [c.label]: open }))
                                                                                }
                                                                                onValueChange={(value: string) =>
                                                                                    setExpense({ ...expense, [c.label.toLowerCase()]: value })
                                                                                }
                                                                            >
                                                                                <SelectTrigger className="rounded-md border-r-2 p-3">
                                                                                    <SelectValue
                                                                                        placeholder={c.placeHolderElement}
                                                                                        className={c.status}
                                                                                    >
                                                                                        <p className="text-sm break-all">
                                                                                            {expense[c.label.toLowerCase() as keyof Expense]}
                                                                                        </p>
                                                                                    </SelectValue>
                                                                                </SelectTrigger>
                                                                                <SelectContent>
                                                                                    <SelectGroup>
                                                                                        {Array.isArray(c.valueElement) &&
                                                                                            c.valueElement.map((v: string, indexElement: number) => (
                                                                                                <SelectItem key={indexElement} value={v}>
                                                                                                    {v}
                                                                                                </SelectItem>
                                                                                            ))}
                                                                                    </SelectGroup>
                                                                                </SelectContent>
                                                                            </Select>
                                                                            ) : null}
                                                                        </div>
                                                                    ))}
                                                                    <div>
                                                                        <Label htmlFor="Amount">Amount</Label>
                                                                        <Input
                                                                            id="Amount"
                                                                            name="amount"
                                                                            type="text"
                                                                            className={`p-2 ${status >= 16 && status <= 19 ? 'border-red-500' : ''}`}
                                                                            placeholder="How much is the expense?"
                                                                            value={`${getCurrencySymbol(expense.countryCurrency)}${expense.amount}`}
                                                                            onChange={handleChangeInput}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label htmlFor="day">Expense Day</Label>
                                                                        <Select
                                                                            name="day"
                                                                            defaultValue="1"
                                                                            value={String(expense.day)}
                                                                            onValueChange={(value: string) =>
                                                                                setExpense({ ...expense, day: Number(value) })
                                                                            }
                                                                        >
                                                                            <SelectTrigger className="rounded-md border-r-2 p-3">
                                                                                <SelectValue 
                                                                                    placeholder="Select a day" 
                                                                                    className={status == 20 ? 'border-red-500' : ''}
                                                                                />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                            <SelectGroup>
                                                                                {trip &&
                                                                                    Array.from({ length: trip.daysQty }).map((_, index) => (
                                                                                        <SelectItem key={index} value={String(index + 1)}>
                                                                                            {index + 1}° Day
                                                                                        </SelectItem>
                                                                                    ))
                                                                                }
                                                                            </SelectGroup>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>
                                                                </div>
                                                            <DialogFooter>
                                                            <Button type="button" size="lg" 
                                                                onClick={() => {
                                                                    setExpense({...expense, type: dataForm[index].type});
                                                                    handleCreate();
                                                                }}
                                                            >
                                                                {dataForm[index].operation} Expense
                                                            </Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                </div>
                                            </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                    </Carousel>
                                </div> 
                                <div className="flex justify-center">
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
                            </>      
                            : null
                        }
                        <div className={`${showContent == true ? 'hidden' : ''} w-full grid `}>
                            <Button
                                size={'auto'} variant={`${showContent == false ? 'default' : 'outline'}`} 
                                className="gap-1 flex justify-center " 
                                onClick={()=> {
                                    showContent == false ? setShowContent(null) : setShowContent(false)}
                            }>
                                {
                                    showContent == false ?
                                    <>
                                        <X />
                                        Close
                                    </>
                                    :
                                    <>
                                        <Plus />
                                        Create expanse
                                    </>
                                }
                            </Button>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="flex items-center gap-1.5 w-full text-[4vw] xxs5:text-base sm:text-base lg:text-lg">
                                    <p>
                                        Forgot your trip details?
                                    </p>
                                    <strong className="cursor-pointer">
                                        Click here.
                                    </strong>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="rounded-md w-full">
                                <DialogHeader>
                                    <DialogTitle>Trip Details</DialogTitle>
                                    <DialogDescription>
                                        Forgot your trip details? No worries! Here they are, ready to refresh your memory!
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid place-items-start gap-1 py-1">
                                    <div className="flex items-center gap-2">
                                        <p className="text-base font-semibold">
                                            Name: 
                                        </p>
                                        <p className="text-base">
                                            {trip?.tripName}.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-base font-semibold">
                                            Period: 
                                        </p>
                                        <p className="text-base">
                                            {trip?.period }.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-base font-semibold">
                                            Duration: 
                                        </p>
                                        <p className="text-base">
                                            {trip?.daysQty} {Number(trip?.daysQty) > 1 ? 'Days' : 'Day'}.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-base font-semibold">
                                            Season: 
                                        </p>
                                        <p className="text-base">
                                            {trip?.season}.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-base font-semibold">
                                            Budget: 
                                        </p>
                                        <p className="text-base">
                                            {getCurrencySymbol(String(trip?.currency))}{NumberFormatted(Number(trip?.budgetAmount))}.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-base font-semibold">
                                            Spent: 
                                        </p>
                                        <p className="text-base">
                                            {getCurrencySymbol(String(trip?.currency))}{NumberFormatted(Number(trip?.spent))}.
                                        </p>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                        <Toaster />
                    </div>  
                </div>
            </MiddlePageOneCol>
            <BottomPage>
                <Credits />
            </BottomPage>
        </BodyPage>
    )
}