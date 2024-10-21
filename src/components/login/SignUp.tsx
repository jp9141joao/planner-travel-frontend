import Image from "@/assets/undraw_adventure_map_hnin.svg"
import { Input } from "../ui/input"
import { CircleHelp } from "lucide-react"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Link } from "react-router-dom"

export default function SignIn(){

    return (
        <div className="grid grid-cols-2">
            <div>
                <div>
                    <h1 className="text-center text-8xl">Join Us and <br/>Start Your Journey!</h1>
                </div>
                <div>
                    <div className="mt-1 grid w-full items-center gap-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" placeholder="name@example.com" />
                    </div>
                    <div className="mt-1 grid w-full items-center gap-1.5">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input type="text" id="lastName" placeholder="name@example.com" />
                    </div>
                    <div className="mt-1 grid w-full items-center gap-1.5">
                        <Label htmlFor="cellphone">Cellphone</Label>
                        <Input type="text" id="cellphone" placeholder="name@example.com" />
                    </div>
                    <div className="mt-1 grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="name@example.com" />
                    </div>
                    <div className="mt-4 grid w-full items-center gap-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" placeholder="Abc123" />
                    </div>
                    <div className="mt-4 grid w-full items-center gap-1.5">
                        <Label htmlFor="confirmPassword">Confirm your password</Label>
                        <Input type="password" id="confirmPassword" placeholder="Abc123" />
                    </div>
                    <div className="mt-4 flex w-full items-center gap-1.5">
                        <Checkbox id="remember-me"/>
                        <Label htmlFor="remember-me">Remember for 30 days</Label>
                    </div>
                    <div className="mt-4 grid w-full items-center gap-1.5">
                        <Button type="submit">Sign in</Button>
                    </div>
                    <div className="hidden mt-6 flex w-full justify-center items-center gap-1.5 text-center text-xs" >
                        <Separator className="w-36 sm:w-40 md:w-48" />
                        <p className="text-xs"> OR </p>
                        <Separator className="w-36 sm:w-40 md:w-48" />
                    </div>
                    <div className="flex justify-center mt-3 gap-2">
                        <p>Don't have a account? </p>
                        <Link to={""}>
                            <a className="underline">Sign up!</a>
                        </Link>
                    </div>
                </div>
            </div>    
            <div>
                <img
                    src={Image}
                    className="w-full h-auto"
                />
            </div>        
        </div>
    )
}