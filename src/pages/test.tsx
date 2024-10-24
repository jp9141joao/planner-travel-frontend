import NavBar from "@/components/NavBar"
import Credits from '@/components/Credits';
import SignIn from "@/components/login/SignIn";
import { Link } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import SignUp from "@/components/login/SignUp";
import { useState } from "react";

export default function Test(){

    return (
        <>
            <div className="top-0 font-semibold mt-3 mb-20 ml-5" style={{display: 'inline-flex'}}>
                <Link to={'/home'}>
                    <h1 className="inline-flex items-center gap-2 text-lg hover:-translate-x-1 transition-all">
                        <MoveLeft className="mt-0.5" />
                        Go back
                    </h1>
                </Link>
            </div>
            <div className="flex-grow">
                {/*<SignUp/><SignIn/>*/}
                <SignIn/>
            </div>
            <div className="grid place-items-center">
                <Credits/>
            </div>
        </>
    )
}