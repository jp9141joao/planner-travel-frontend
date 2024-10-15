import { useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { MoveRight } from 'lucide-react';
import { AlignJustify } from 'lucide-react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog } from '@headlessui/react';
import { Button } from "@/components/ui/button";
import { Item } from "@radix-ui/react-menubar";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

const navigation = [
    { name: 'Home', href: '/home' },
    { name: 'Expenses', href: '/expenses' },
    { name: 'Itinerary', href: '/itinerary' },
    { name: 'To do list', href: '/toDoList' },
    { name: 'My piggy bank', href: '/myPiggyBank' }
];

export default function NavBar() {
    const { 
        idProfile, 
        idTravel, 
        idExpense, 
        idItinerary, 
        idToDoList 
    } = useParams<{
        idProfile: string, 
        idTravel: string, 
        idExpense: string, 
        idItinerary: string, 
        idToDoList: string
    }>()

    

    return (
        <header className="top-0 font-semibold">
            <nav className="flex items-center justify-between mt-3 mx-5">
                <div className="flex justify-start">
                    <Link to={"/home"}>
                        <h1 className="text-md lg:text-lg xl:text-xl">
                            Easy Trip
                        </h1>
                    </Link>
                </div>
                <div className="hidden 2xl:flex xl:gap-14 lg:gap-12 md:gap-6">
                    {
                        navigation.map((Item) => (
                            <Link key={Item.name} to={Item.href}>
                                <h1 className="text-md xl:text-xl hover:translate-y-1 transition-all">
                                    {Item.name}
                                </h1>
                            </Link>
                        ))
                    }
                </div>
                <div className="hidden 2xl:flex">
                    <Link to={"/login"}>
                        <h1 className="flex text-md xl:text-xl gap-2 hover:translate-x-1 transition-all">
                            Login
                            <MoveRight className="lg:mt-1"/>
                        </h1>
                    </Link>
                </div>
                <div className="flex 2xl:hidden">
                    <Sheet>
                        <SheetTrigger>
                            <AlignJustify/>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                            <SheetTitle>Easy Trip</SheetTitle>
                            <SheetDescription className="flex text-left text-lg">
                                <div>
                                    {
                                        navigation.map((Item) => (
                                            <Link key={Item.name} to={Item.href}>
                                                <h1 className="hover:translate-x-2 transition-all mt-3">
                                                    {Item.name}
                                                </h1>
                                            </Link>
                                        ))
                                    }
                                    <Link to={"/login"}>
                                        <h1 className="flex gap-2 mt-6 hover:translate-x-2 transition-all">
                                            <strong>Login</strong>
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

{/*
    <header className="absolute inset-x-0 top-0 z-50">
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-2.5 p-2.5">
                        <h1 className="text-sm font-semibold leading-6 text-gray-900 lg:text-md xl:text-lg" >
                            Easy Trip
                        </h1>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} to={item.href} className="text-sm font-semibold leading-6 text-gray-900 lg:text-md xl:text-lg">
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link to="#" className="text-sm font-semibold leading-6 text-gray-900 lg:text-md xl:text-lg">
                        Log in <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                    <Link to="/" className="-m-1 p-1">
                        <h1 className="text-sm font-semibold leading-6 text-gray-900 lg:text-md xl:text-lg" >
                            Easy Trip
                        </h1>
                    </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>    
    */}