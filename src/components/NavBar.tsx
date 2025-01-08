import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronDown, MoveRight } from 'lucide-react';
import { AlignJustify } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

export default function NavBar() {
    
    const navigation = [
        { name: 'Home', href: '/home' },
        { name: 'Expenses', href: '/expenses' },
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
                        <h1 className="md:text-base lg:text-lg xl:text-xl">
                            Easy Trip
                        </h1>
                    </Link>
                </div>
                <div className="hidden md:flex xl:gap-14 lg:gap-12 md:gap-6">
                    {
                        navigation.map((item, index) => (
                            <Link key={index} to={item.href}>
                                <h1 className={`md:text-base lg:text-lg xl:text-xl hover:translate-y-1 transition-all`}>
                                    {item.name}
                                </h1>
                            </Link>
                        ))
                    }
                </div>
                <div className="hidden md:flex">
                    <Link to={`/${isAuthenticated ? 'settings' : 'signIn'}`}>
                        <h1 className="flex md:text-base lg:text-lg xl:text-xl gap-2 hover:translate-x-1 transition-all">
                            { isAuthenticated ? 'Profile' :  'Login' }
                            <MoveRight className="md:mt-0.5 lg:mt-1"/>
                        </h1>
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
                                Easy Trip
                            </SheetTitle>
                            <SheetDescription className="flex text-left text-xl">
                                <div>
                                    {
                                        navigation.map((item, index) => (
                                            <Link key={index} to={item.href}>
                                                <h1 className={`hover:-translate-y-1 transition-all mt-3`}>
                                                    {item.name}
                                                </h1>
                                            </Link>
                                        ))
                                    }
                                    <Link to={`/${isAuthenticated ? 'settings' : 'signIn'}`}>
                                        <h1 className="flex gap-2 mt-6 hover:translate-x-2 transition-all">
                                            <strong>{ isAuthenticated ? 'Profile' :  'Login' }</strong>
                                            <MoveRight className="mt-1"/>
                                        </h1>
                                    </Link>
                                </div>
                            </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    
    );
}

{/*}
export default function NavBar() {
    
    const navigation = [
        { name: 'Home', href: '/home' },
        { name: 'Expenses', href: '/expenses' },
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

    const [active, setActive] = useState<number>(0);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    function isActive(name: string){
        name == navigation[navigation.findIndex(item => item.name = name)].name && 
        if (active == navigation.findIndex(item => item.name = name)) {
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setIsAuthenticated(true);
        }

        if (idExpense != undefined) {
            setActive(0);
        } else if (idItinerary != undefined) {
            setActive(1);
        } else if (idToDoList != undefined) {
            setActive(2);
        } else if (idMyPiggyBank != undefined) {
            setActive(3);
        } else if (idTravel != undefined) {
            setActive(4);
        } else {
            setActive(5);                     
        }
    },[idTravel, idExpense, idItinerary, idToDoList, idMyPiggyBank])

    return (
        <header className=" top-0 font-semibold w-full">
            <nav className="flex items-center justify-between my-3 mx-5 text-gray-900">
                <div className="flex justify-start">
                    <Link to={"/home"}>
                        <h1 className="md:text-base lg:text-lg xl:text-xl">
                            Easy Trip
                        </h1>
                    </Link>
                </div>
                <div className="hidden md:flex xl:gap-14 lg:gap-12 md:gap-6">
                    {
                        navigation.map((item, index) => (
                            <Link key={index} to={item.href}>
                                <h1 className={`md:text-base lg:text-lg xl:text-xl hover:translate-y-1 transition-all ${isActive(item.name) ? 'underline' : ''}`}>
                                    {item.name}
                                </h1>
                            </Link>
                        ))
                    }
                </div>
                <div className="hidden md:flex">
                    <Link to={`/${isAuthenticated ? 'settings' : 'signIn'}`}>
                        <h1 className="flex md:text-base lg:text-lg xl:text-xl gap-2 hover:translate-x-1 transition-all">
                            { isAuthenticated ? 'Settings' :  'Login' }
                            <MoveRight className="md:mt-0.5 lg:mt-1"/>
                        </h1>
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
                                Easy Trip
                            </SheetTitle>
                            <SheetDescription className="flex text-left text-xl">
                                <div>
                                    {
                                        navigation.map((item, index) => (
                                            <Link key={`${item}${index}`} to={item.href}>
                                                <h1 className={`hover:-translate-y-1 transition-all mt-3 ${isActive(item.name) ? 'underline' : ''}`}>
                                                    {item.name}
                                                </h1>
                                            </Link>
                                        ))
                                    }
                                    <Link to={"/signIn"}>
                                        <h1 className="flex gap-2 mt-6 hover:translate-x-2 transition-all">
                                            <strong>{ isAuthenticated ? 'Settings' :  'Login' }</strong>
                                            <MoveRight className="mt-1"/>
                                        </h1>
                                    </Link>
                                </div>
                            </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    
    );
}
*/}