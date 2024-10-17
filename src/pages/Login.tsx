import NavBar from "@/components/NavBar"
import Credits from '@/components/Credits';
import SignIn from "@/components/login/signin/page";

export default function Login(){

    return (
        <>
            <div className="hidden">
                <NavBar/>
            </div>
            <div className="flex-grow">
                <SignIn/>
            </div>
            <div className="hidden">
                <Credits/>
            </div>
        </>
    )
}