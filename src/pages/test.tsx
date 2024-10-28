import NavBar from "@/components/NavBar"
import Credits from '@/components/Credits';
import SignIn from "@/components/login/SignIn";
import { Link } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import SignUp from "@/components/login/SignUp";
import { useState } from "react";

export default function Login(){

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <div className="top-0 left-0 fixed font-semibold ml-5 mt-3 z-50">
                    <Link to="/home">
                        <h1 className="inline-flex items-center gap-2 text-lg hover:-translate-x-1 transition-all">
                            <MoveLeft className="mt-0.5" />
                            Go back
                        </h1>
                    </Link>
                </div>

                <div className="flex-grow">
                    {/*<SignUp/><SignIn/>*/}
                    <SignUp/>
                </div>
                <div className="my-auto 2xl:mt-40">
                    <div className="text-center relative bottom-0 w-full">
                        <Credits />
                    </div>
                </div>
            </div>
        </>
    )
}