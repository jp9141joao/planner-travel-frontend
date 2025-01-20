import Credits from "@/components/Credits";
import { GoBack } from "@/components/GoBack";
import { BodyPage, BottomPage, MiddlePage, TopPage } from "@/components/LayoutPage/Layouts";
import { Input, InputIntegraded } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";
import { ReactHTML, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from '../assets/undraw_departing_010k (2).svg'
import { createTrip } from "@/service/service";
import { Trip } from "@/types/types";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { Select, SelectContent, SelectItem, SelectTriggerInput, SelectValue } from "@/components/ui/select";
import { ButtonPlaceSuggestion } from "@/components/PlaceSuggestions";
import { Value } from "@radix-ui/react-select";

export default function AddTrips () {

    const [ tripName, setTripName ] = useState<string>('');
    const [ period, setPeriod ] = useState<string>('');
    const [ daysQty, setDaysQty ] = useState<number>(0);
    const [ budgetAmount , setBudgetAmount ] = useState<number | string>('$0');
    const [ currency, setCurrency ] = useState<string>('USD');
    const [ season, setSeason] = useState<string>('');
    const [ toastMessage, setToastMessage ] = useState({
        variant: '', title: '', description: ''
    });
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ showToast, setShowToast ] = useState<boolean>(false);
    const [ status, setStatus ] = useState<number>(0);
    const navigate = useNavigate();

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
        return symbols[value] || currency;
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const symbol = getCurrencySymbol(currency);
    
        if (!inputValue.startsWith(symbol)) {
            setBudgetAmount(symbol);
            return;
        }
    
        const valueWithoutSymbol = inputValue.substring(symbol.length);
        const numericValue = parseFloat(valueWithoutSymbol.replace(',', '.'));
    
        if (!isNaN(numericValue)) {
            setBudgetAmount(`${symbol}${numericValue}`);
        } else {
            setBudgetAmount(`${symbol}`);
        }
    }

    const handleChangeSelect = (value: string) => {
        const oldSymbol = getCurrencySymbol(currency);
        const newSymbol = getCurrencySymbol(value);

        setCurrency(newSymbol);

        if (typeof budgetAmount == 'string') {
            const InputValue = budgetAmount.substring(oldSymbol.length);
            setBudgetAmount(`${newSymbol}${InputValue}`)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            
            //const response = await createTrip({ 
            // tripName, 
            // period, 
            // daysQty, 
            // placesQty: 0
            // currency,
            // budgetAmount: Number(budgetAmount.substring(currency.length)),
            // season: 
            //} as Trip);
            const response = { success: true, error: '', data: ''}
            
            if (response.success) {
                setStatus(1);
                //navigate('/home');
            } else {
                if (response.error == 'Error: The value of tripName is invalid!') {
                    setStatus(2);
                } else if (response.error == 'Error: The value of tripName is too short!') {
                    setStatus(3);
                } else if (response.error == 'Error: The value of tripName is too large!') {
                    setStatus(4);
                } else if (response.error == 'Error: The value of period is invalid!') {
                    setStatus(5);
                } else {
                    setStatus(6);
                }
            }

            setIsLoading(false);
            setShowToast(true);
        } catch (error: any) {
            setStatus(8);
            setIsLoading(false);
            setShowToast(true);
            console.log(error);
        } 
    };
    
    useEffect(() => {
        const startMonth = period.substring(0, 3);

        if (['Dec', 'Jan', 'Feb', 'Jun', 'Jul', 'Aug'].includes(startMonth)) {
            setSeason('High');
        } else if (['Mar', 'Apr', 'May'].includes(startMonth)) {
            setSeason('Middle');
        } else if (['Sep', 'Oct', 'Nov'].includes(startMonth)) {
            setSeason('Low');
        } else {
            setSeason(''); 
        }

    }, [period]);
    
    useEffect(() => {
        if (!isLoading && showToast) {
            if (status == 1) {
                setToastMessage({
                    variant: 'success',
                    title: 'Trip created successfully!',
                    description: 'Your trip is now set! Get ready for your next adventure.',
                });
            } else if (status == 2) {
                setToastMessage({
                    variant: 'destructive',
                    title: 'Invalid Trip Name',
                    description: 'The trip name you entered is invalid. Please check and try again.',
                });
            } else if (status == 3) {
                setToastMessage({
                    variant: 'destructive',
                    title: 'Trip Name Too Short',
                    description: 'The trip name is too short. Please enter a shorter trip name.',
                });
            } else if (status == 4) {
                setToastMessage({
                    variant: 'destructive',
                    title: 'Trip Name Too Long',
                    description: 'The trip name address is too long. Please enter a shorter trip name.',
                });
            } else if (status == 5) {
                setToastMessage({
                    variant: 'destructive',
                    title: 'Invalid Period',
                    description: 'The period you entered is invalid. Please check and try again.',
                });
            } else {
                setToastMessage({
                    variant: 'destructive',
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                });
            }
        }
    }, [isLoading, showToast, status]);

    const onPeriodChange = (period: string) => {
        setPeriod(period);
    };

    const onDaysQtyChange = (daysQty: number) => {
        setDaysQty(daysQty);
    };

    useEffect(() => {
        if (showToast && status == 100) {
            toast({
                variant: toastMessage.variant == 'destructive' ? 'destructive' : 'success',
                title: toastMessage.title,
                description: toastMessage.description,
            })
        }

        if (status == 1) {
            setStatus(0);
        }
        
    }, [toastMessage]);

    return (
        <BodyPage>
            <TopPage>
                <GoBack to="home"/>
            </TopPage>
            <MiddlePage>
                <div className="hidden lg:block mx-[2vw]">
                    {/*
                    <img
                        src={Image}
                        className="w-auto h-auto"
                    />
                    */}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='table mx-auto mt-[2vw] xxs3:mt-[8vw] xs:mt-[3vw] sm:mt-[10vw] lg:mt-0'>
                        <div className="grid text-center place-items-center leading-tight gap-y-0 text-gray-900 tracking-tight">
                            <div>
                                <h1 className="grid text-[13.2vw] xxs5:text-[12.6vw] xs:text-[9.1vw] lg:text-[3.9vw] w-full text-gray-900 tracking-tight leading-[0.9] xs:leading-[0.7]">
                                    Create Your Trip!
                                </h1>
                            </div>
                            <div>
                                <p className="xs:text-start text-[6.9vw] xxs8:text-[6.7vw] xs:text-[4.8vw] lg:text-[1.9vw] mt-[3.2vw] xs:mt-[2.7vw] lg:mt-[0.8vw] leading-tight text-gray-900 tracking-tight">
                                    Your next adventure awaits.
                                </p>
                            </div>
                        </div>
                        <div className="grid place-items-center gap-y-2 xxs11:mt-[4vw] xs:mt-[2vw] lg:mt-[0.8vw] px-0 w-full" >
                            <div className="grid gap-1.5 w-full place-items-start">
                                <Label htmlFor="name" className="text-[4vw] xxs5:text-sm sm:text-base lg:text-lg">
                                    Trip Name
                                </Label>
                                <Input 
                                    type="text" 
                                    id="name"
                                    placeholder="Enter the trip name"
                                    value={tripName}
                                    onChange={(e) => setTripName(e.target.value)}
                                    onClick={() => setStatus(0)}
                                    className={status == 2 || status == 3 ? "border-red-500" : "" }
                                />
                            </div>
                            <div className="grid gap-1.5 w-full place-items-start">
                                <Label htmlFor="travelPeriod" className="text-[4vw] xxs5:text-sm sm:text-base lg:text-lg">
                                    Trip Period.
                                </Label>
                                <div className="w-full" onClick={() => { setStatus(0) }}>
                                    <DatePickerWithRange onPeriodChange={onPeriodChange} onDaysQtyChange={onDaysQtyChange} status={status}/>
                                </div>
                            </div>
                            <div className="grid gap-1.5 w-full place-items-start">
                                <Label htmlFor="budget" className="text-[4vw] xxs5:text-sm sm:text-base lg:text-lg">
                                    Budget
                                </Label>
                                <div className="w-full flex items-center w-full" onClick={() => { setStatus(0) }}>
                                    <InputIntegraded
                                        type="text"
                                        placeholder="Enter amount"
                                        value={budgetAmount}
                                        onChange={handleChangeInput}
                                        className={`w-full ${status === 5 ? "border-red-500" : ""}`}
                                    />
                                    <Select defaultValue="USD" onValueChange={handleChangeSelect}>
                                        <SelectTriggerInput className="w-24">
                                            <SelectValue placeholder="Currency" />
                                        </SelectTriggerInput>
                                        <SelectContent>
                                            <SelectItem value="USD">USD</SelectItem>
                                            <SelectItem value="EUR">EUR</SelectItem>
                                            <SelectItem value="BRL">BRL</SelectItem>
                                            <SelectItem value="GBP">GBP</SelectItem>
                                            <SelectItem value="JPY">JPY</SelectItem>
                                            <SelectItem value="AUD">AUD</SelectItem>
                                            <SelectItem value="CAD">CAD</SelectItem>
                                            <SelectItem value="CHF">CHF</SelectItem>
                                            <SelectItem value="CNY">CNY</SelectItem>
                                            <SelectItem value="INR">INR</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid gap-1.5 w-full mt-1 xs:mt-2">
                                <Button type="submit">
                                    {
                                        isLoading ? 
                                        <div role="status">
                                            <svg aria-hidden="true" className="w-8 h-8 text-white animate-spin fill-white py-1" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5533C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.723 75.2124 7.41289C69.5422 4.10285 63.2754 1.94025 56.7222 1.05197C51.7666 0.3679 46.7398 0.446843 41.8198 1.27873C39.297 1.6983 37.8255 4.19778 38.4626 6.62326C39.0998 9.04874 41.5717 10.4717 44.0965 10.1071C47.8511 9.53005 51.7015 9.52622 55.4656 10.0962C60.878 10.9201 65.9925 13.1373 70.396 16.5714C74.7995 20.0055 78.3892 24.5698 80.8418 29.841C83.0456 34.3696 84.5159 39.246 85.1999 44.2728C85.6531 47.6269 88.1603 50.0379 91.5303 50.0379C91.9338 50.0379 92.3423 49.9962 92.7521 49.9106C95.209 49.4046 96.5425 46.9181 95.9355 44.4609C95.324 41.9793 94.5211 39.5402 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                            <span className="sr-only">Carregando...</span>
                                        </div>
                                        : "Create Travel"
                                    }
                                </Button>
                                <div className="flex justify-center items-center gap-1.5 w-full text-[4vw] xxs5:text-sm mt-[0.8vw] sm:text-base lg:text-lg">
                                    <p>
                                        Don't you know where to go?
                                    </p>
                                    <ButtonPlaceSuggestion/>
                                </div>
                                <Toaster />
                            </div>
                        </div>
                    </div>
                </form>
                <div className="lg:hidden mx-[20vw] xxs3:mx-[10.8vw] xs:mx-[28vw] sm:mx-[21vw] my-[2.8vw] xxs5:my-[2.4vw] xs:my-[2vw] sm:my-[3vw]">
                    <img
                        src={Image}
                        className="w-auto h-auto"
                    />
                </div>
            </MiddlePage>
            <BottomPage>
                <Credits/>
            </BottomPage>
        </BodyPage>
    )
}
