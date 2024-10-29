import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function GoBack(){
    
    return (
        <div className="top-0 font-semibold ml-5 mt-3 z-50 ">
            <Link to="/home">
                <h1 className="inline-flex items-center gap-2 text-lg hover:-translate-x-1 transition-all">
                    <MoveLeft className="mt-0.5" />
                    Go back
                </h1>
            </Link>
        </div>
    )
} 