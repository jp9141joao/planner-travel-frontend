import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";

export function GoBack(){
    
    return (
        <header className="fixed top-0 font-semibold w-full bg-[#FF7F50] border-b-2 rounded-md shadow-lg">
            <nav className="md:text-base lg:text-lg xl:text-xl my-3 ml-5 text-white">
                <Link to={'/home'}>
                    <h2 className="flex gap-1">{/*gap-2 text-lg hover:-translate-x-1 transition-all*/}
                        <MoveLeft className=""/>
                        Go back
                    </h2>
                </Link>
            </nav>
        </header>
    )
} 