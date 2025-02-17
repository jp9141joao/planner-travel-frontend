import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MoveRight } from 'lucide-react';
import { AlignJustify } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { setItemSessionStorage } from "./utils/utils";

export default function NavBar() {
    
    const navigation = [
        { name: 'Home', href: '/home' },
        { name: 'Expenses', href: '/viewExpenses' },
        { name: 'Itinerary', href: '/itinerary' },
        { name: 'To do list', href: '/toDoList' },
        { name: 'My piggy bank', href: '/myPiggyBank' },
    ];

    const { 
        idTravel, 
        idExpense, 
        idItinerary, 
        idToDoList,
        idMyPiggyBank
    } = useParams<{
        idProfile: string, 
        idTravel: string, 
        idExpense: string, 
        idItinerary: string, 
        idToDoList: string,
        idMyPiggyBank: string
    }>();

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (token) {
            setIsAuthenticated(true);
        }

    },[idTravel, idExpense, idItinerary, idToDoList, idMyPiggyBank])

    return (
        <header className=" top-0 font-semibold w-full">
            <nav className="flex items-center justify-between my-3 mx-5 text-gray-900">
                <div className="flex justify-start">
                    <Link to={"/home"}>
                        <p className="md:text-base lg:text-lg xl:text-xl">
                            Easy Trip
                        </p>
                    </Link>
                </div>
                <div className="hidden md:flex xl:gap-14 lg:gap-12 md:gap-6">
                    {
                        navigation.map((item, index) => (
                            <Link key={index} to={item.name != 'Home' ? '/selectTrip' : '/home'} onClick={() => item.name != 'Home' ? setItemSessionStorage('route', item.href) : null}>
                                <p className={`md:text-base lg:text-lg xl:text-xl hover:translate-y-1 transition-all`}>
                                    {item.name}
                                </p>
                            </Link>
                        ))
                    }
                </div>
                <div className="hidden md:flex">
                    <Link to={`/${isAuthenticated ? 'profileSettings' : 'signIn'}`}>
                        <p className="flex md:text-base lg:text-lg xl:text-xl gap-2 hover:translate-x-1 transition-all">
                            { isAuthenticated ? 'Profile' :  'Login' }
                            <MoveRight className="md:mt-0.5 lg:mt-1"/>
                        </p>
                    </Link>
                </div>
                <div className="flex md:hidden">
                    <Sheet>
                        <SheetTrigger>
                            <AlignJustify/>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle className="text-xl">
                                    <Link to={"/home"}>
                                        <p className="md:text-base lg:text-lg xl:text-xl">
                                            Easy Trip
                                        </p>
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="grid text-left text-xl" aria-describedby="dialog-description">
                                {
                                    navigation.map((item, index) => (
                                        <Link key={index} to={item.name != 'Home' ? '/selectTrip' : '/home'}  onClick={() => item.name != 'Home' ? setItemSessionStorage('route', item.href) : null}>
                                            <p className={`hover:-translate-y-1 transition-all mt-3`}>
                                                {item.name}
                                            </p>
                                        </Link>
                                    ))
                                }
                                <Link to={`/${isAuthenticated ? 'profileSettings' : 'signIn'}`}>
                                    <p className="flex gap-2 mt-6 hover:translate-x-2 transition-all">
                                        <strong>{ isAuthenticated ? 'Profile' :  'Login' }</strong>
                                        <MoveRight className="mt-1"/>
                                    </p>
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    
    );
}
