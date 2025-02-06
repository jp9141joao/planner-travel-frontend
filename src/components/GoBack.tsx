import { MoveLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export function GoBack({ to }: { to: string }){
    
    return (
        <header className="top-0 font-semibold">
            <nav className="md:text-base lg:text-lg xl:text-xl my-3 ml-5 text-gray-900">
                <Link to={`/${to}`}>
                    <div className="flex items-center gap-1 hover:-translate-x-1 transition-all">
                        <MoveLeft/>
                        <h2 className="hidden xxs5:block">
                            Go back
                        </h2>
                    </div>
                </Link>
            </nav>
        </header>
    )
} 