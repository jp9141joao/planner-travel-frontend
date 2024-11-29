import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";

export function GoBack(){
    
    return (
        <div className="absolute top-0 font-semibold z-50 w-full">
            <Link to="/home">
                <h1 className="inline-flex w-full pl-5 py-2 gap-2 text-lg hover:-translate-x-1 transition-all xxs11:bg-color-body-gray sm:bg-transparent">
                    <MoveLeft className="mt-0.5" />
                    Go back
                </h1>
            </Link>
            <div className="px-4 sm:hidden">
                <Separator />
            </div>
        </div>
    )
} 