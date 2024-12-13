import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function GoBack(){
    
    return (
        <header className="top-0 font-semibold">
            <nav className="md:text-base lg:text-lg xl:text-xl my-3 ml-5 text-gray-900">
                <Link to={'/home'}>
                    <h2 className="flex gap-1 hover:-translate-x-1 transition-all">
                        <MoveLeft className="mt-[0.3vw]"/>
                        Go back
                    </h2>
                </Link>
            </nav>
        </header>
    )
} 