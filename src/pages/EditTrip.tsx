import Credits from "@/components/Credits";
import { GoBack } from "@/components/GoBack";
import { BodyPage, BottomPage, MiddlePageOneCol, TopPage } from "@/components/LayoutPage/Layouts";
import { Input, InputIntegraded } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import { editTrip, getTrip } from "@/service/service";
import { Trip } from "@/types/types";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { Select, SelectContent, SelectItem, SelectTriggerInput, SelectValue } from "@/components/ui/select";
import { getItemSessionStorage } from "@/components/utils/utils";
import { DateRange } from "react-day-picker";
import { parse } from 'date-fns';


export default function EditTrip() {

    const [ trip, setTrip ] = useState<Trip | null>(null);
    const [ tripName, setTripName ] = useState<string>('');
    const [ period, setPeriod ] = useState<string>('');
    const [ daysQty, setDaysQty ] = useState<number>(0);
    const [ budgetAmount , setBudgetAmount ] = useState<number | string>('$0');
    const [ currency, setCurrency ] = useState<string>('USD');
    const [ season, setSeason] = useState<string>('');
    const [ reset, setReset ] = useState<boolean>(false);
    const [ toastMessage, setToastMessage ] = useState({
        variant: '', title: '', description: ''
    });
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ showToast, setShowToast ] = useState<boolean>(false);
    const [ status, setStatus ] = useState<number>(0);
    const [ buttonDisabled, setButtonDisabled ] = useState<boolean>(true);

    function transformPeriodToDateRange(period: string): DateRange | undefined {
        const [fromDate, toDate] = period.split(' - ');
    
        if (!fromDate || !toDate) {
            return undefined; 
        }
    
        const from = parse(fromDate.trim(), 'MMM dd, yyyy', new Date());
        const to = parse(toDate.trim(), 'MMM dd, yyyy', new Date());
    
        if (isNaN(from.getTime()) || isNaN(to.getTime())) {
            return undefined; 
        }
    
        return { from, to };
    }

    const loadTrip = async () => {
        try {
            const tripId = getItemSessionStorage('tripId');
        
            if (!tripId) {
                throw new Error('Trip Id is missing');
            }

            const response = await getTrip('editTrip' as string ,tripId as string, );

            if (response.success) {
                setTrip(response.data);
                setTripName(response.data.tripName);
                setPeriod(response.data.period);
                setDaysQty(response.data.daysQty);
                setSeason(response.data.season);
                setBudgetAmount(`${getCurrencySymbol(response.data.currency)}${response.data.budgetAmount}`);
                setCurrency(response.data.currency);
                setButtonDisabled(true);
            } else {
                toast({
                    variant: 'destructive',
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                });
            }
        } catch(error: any) {
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

        setCurrency(value);

        if (typeof budgetAmount == 'string') {
            const InputValue = budgetAmount.substring(oldSymbol.length);
            setBudgetAmount(`${newSymbol}${InputValue}`)
        }
    }

    const onPeriodChange = (period: string) => {
        setPeriod(period);
    };

    const onDaysQtyChange = (daysQty: number) => {
        setDaysQty(daysQty);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            const tripId = getItemSessionStorage('tripId');

            const response = await editTrip({ 
                id: tripId, 
                tripName, 
                period, 
                daysQty, 
                currency,
                budgetAmount: Number(budgetAmount.toString().substring(getCurrencySymbol(currency).length)),
                season,
                spent: 0
            } as Trip);
                        
            if (response.success) {
                setStatus(1);
                loadTrip();
                //navigate('/editTrip');
            } else {
                if (response.error == 'Error: The value of tripName is invalid!') {
                    setStatus(2);
                } else if (response.error == 'Error: The value of tripName is too short!') {
                    setStatus(3);
                } else if (response.error == 'Error: The value of tripName is too large!') {
                    setStatus(4);
                } else if (response.error == 'Error: The value of period is invalid!') {
                    setStatus(5);
                } else if (response.error == 'Error: The value of budget is invalid!') {
                    setStatus(6);
                } else if (response.error == 'Error: The value of currency is invalid!') {

                    setStatus(7);
                } else {
                    setStatus(8);
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
        if (!tripName || !period || !daysQty || !budgetAmount || !currency || !season) {
            setStatus(8);
        }

        if (trip) {
            if (trip.tripName != tripName || trip.period != period || trip.daysQty != daysQty || `${getCurrencySymbol(trip.currency)}${trip.budgetAmount}` != budgetAmount || trip.currency != currency || trip.season != season) {
                setButtonDisabled(false);
            } else {
                setButtonDisabled(true);
            }
        }
    
    }, [tripName, period, daysQty, budgetAmount, currency, season]);
    
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

        transformPeriodToDateRange(period);
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
            } else if (status == 6) {
                setToastMessage({
                    variant: 'destructive',
                    title: 'Invalid Budget',
                    description: 'The budget you entered is invalid. Please check and try again.',
                });
            } else if (status == 7) {
                setToastMessage({
                    variant: 'destructive',
                    title: 'Invalid Currency',
                    description: 'The currency you entered is invalid. Please check and try again.',
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

    useEffect(() => {
        if (showToast) {
            toast({
                variant: toastMessage.variant == 'destructive' ? 'destructive' : 'success',
                title: toastMessage.title,
                description: toastMessage.description,
            })

            setShowToast(false);
        }

    }, [toastMessage])


    useEffect(() => {
        loadTrip();
    }, [])

    return (
        <BodyPage>
            <TopPage>
                <GoBack  to={'viewTrips'} />
            </TopPage>
            <MiddlePageOneCol>
                <form onSubmit={handleSubmit}>
                    <div className='table mx-auto mt-[2vw] xxs3:mt-[8vw] xs:mt-[3vw] sm:mt-[10vw] lg:mt-0'>
                        <div className="grid text-center place-items-center leading-tight gap-y-0 text-gray-900 tracking-tight">
                            <div>
                                <h1 className="grid text-[14.3vw] xxs5:text-[13.6vw] xs:text-[9.65vw] lg:text-[4.6vw] w-full text-gray-900 tracking-tight leading-[0.9] xs:leading-[1]">
                                    Edit Your Trip!
                                </h1>
                            </div>
                            <div>
                                <p className="xs:text-start text-[5.2vw] xxs8:text-[4.98vw] xs:text-[3.5vw] lg:text-[1.4vw] mt-[3.2vw] xs:mt-[2.7vw] lg:mt-[0.8vw] leading-tight text-gray-900 tracking-tight">
                                    Tweak your plans and make them perfect.
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
                                    className={status >= 2 && status <= 4 ? "border-red-500" : "" }
                                />
                            </div>
                            <div className="grid gap-1.5 w-full place-items-start">
                                <Label htmlFor="travelPeriod" className="text-[4vw] xxs5:text-sm sm:text-base lg:text-lg">
                                    Trip Period.
                                </Label>
                                <div className="w-full" onClick={() => setStatus(0)}>
                                    <DatePickerWithRange reset={reset} value={transformPeriodToDateRange(period)} onPeriodChange={onPeriodChange} onDaysQtyChange={onDaysQtyChange} status={status}/>
                                </div>
                            </div>
                            <div className="grid gap-1.5 w-full place-items-start">
                                <Label htmlFor="budget" className="text-[4vw] xxs5:text-sm sm:text-base lg:text-lg">
                                    Budget
                                </Label>
                                <div className="w-full flex items-center" onClick={() => setStatus(0)}>
                                    <InputIntegraded
                                        type="text"
                                        placeholder="Enter amount"
                                        value={budgetAmount}
                                        onChange={handleChangeInput}
                                        className={`w-full text-[4vw] xs:text-base ${status === 6 ? "border-red-500" : ""}`}
                                    />
                                    <Select 
                                        value={currency}
                                        onValueChange={handleChangeSelect} 
                                        onOpenChange={() => setStatus(0) }
                                    >
                                        <div>
                                            <SelectTriggerInput className={` ${status === 7 ? "border-red-500" : ""}`}>
                                                <SelectValue placeholder="Currency">
                                                    <p className="text-[4vw] xs:text-base">{currency}</p>
                                                </SelectValue>
                                            </SelectTriggerInput>
                                        </div>
                                        <SelectContent className="max-h-[70vw] xs:h-auto">
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
                                <Button type="submit" disabled={buttonDisabled}>
                                    {
                                        isLoading ? 
                                        <div role="status">
                                            <svg aria-hidden="true" className="w-8 h-8 text-white animate-spin fill-white py-1" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5533C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.723 75.2124 7.41289C69.5422 4.10285 63.2754 1.94025 56.7222 1.05197C51.7666 0.3679 46.7398 0.446843 41.8198 1.27873C39.297 1.6983 37.8255 4.19778 38.4626 6.62326C39.0998 9.04874 41.5717 10.4717 44.0965 10.1071C47.8511 9.53005 51.7015 9.52622 55.4656 10.0962C60.878 10.9201 65.9925 13.1373 70.396 16.5714C74.7995 20.0055 78.3892 24.5698 80.8418 29.841C83.0456 34.3696 84.5159 39.246 85.1999 44.2728C85.6531 47.6269 88.1603 50.0379 91.5303 50.0379C91.9338 50.0379 92.3423 49.9962 92.7521 49.9106C95.209 49.4046 96.5425 46.9181 95.9355 44.4609C95.324 41.9793 94.5211 39.5402 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                            <span className="sr-only">Carregando...</span>
                                        </div>
                                        : "Edit Travel"
                                    }
                                </Button>
                                <Toaster />
                            </div>
                        </div>
                    </div>
                </form>
            </MiddlePageOneCol>
            <BottomPage>
                <Credits/>
            </BottomPage>
        </BodyPage>
    )
}
