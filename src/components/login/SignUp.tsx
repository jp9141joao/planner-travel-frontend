import Image from "@/assets/undraw_maker_launch_re_rq81.svg"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { DatePicker } from "../ui/date-picker"
import { Link } from "react-router-dom"
import { GoBack } from "../GoBack";
import Credits from "../Credits";

export default function SignIn(){

    return (
        <>
            <div className="">
                <GoBack />
            </div>

            <div className="flex min-h-screen flex-col">
                <div className="grid grid-cols-1 flex-grow">
                    <div className="grid place-items-center my-16">
                        <div className="grid text-center leading-tight">
                            <p className="text-center text-2xl">
                                Join the  family of
                            </p>
                            <h1 className="text-center text-8xl xl:-mt-4 xl:mb-4">
                                Easy Trip!
                            </h1>
                            <p className="text-center text-2xl">
                                Sign up and explore the world.
                            </p>
                        </div>
                        <div className="grid place-items-center xl:mt-4 gap-y-4">
                            <div className="grid xxs:w-[350px] xs:w-[270px] sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[450px] 2xl:w-[500px] items-center gap-1.5">
                                <Label htmlFor="fullName">
                                    Full name
                                </Label>
                                <Input 
                                    type="text" 
                                    id="" 
                                    placeholder="Your name and last name"
                                />
                            </div>
                            <div className="grid xxs:w-[350px] xs:w-[270px] sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[450px] 2xl:w-[500px] items-center gap-1.5">
                                <Label htmlFor="email">
                                    Email
                                </Label>
                                <Input 
                                    type="email" 
                                    id="email" 
                                    placeholder="name@example.com"
                                />
                            </div>
                            <div className="grid xxs:w-[350px] xs:w-[270px] sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[450px] 2xl:w-[500px] items-center gap-1.5">
                                <Label htmlFor="password">
                                    Password
                                </Label>
                                <Input type="password" id="password" placeholder="Abc123" />
                            </div>
                            <div className="mt-2 grid xxs:w-[350px] xs:w-[270px] sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[450px] 2xl:w-[500px] items-center gap-1.5">
                                <Button type="submit">
                                    Sign Up
                                </Button>
                            </div>
                            <div className="flex justify-center gap-2">
                                <p>
                                    Have a account?
                                </p>
                                <Link to={"/signIn"}>
                                    <a className="underline">
                                        Sign in!
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>    
                    <div className="grid-place-items-center  2xl:my-20">
                            <img 
                                src={Image} 
                                className="w-full  h-full xs:px-[3vw] lg:px-[20vw]" 
                                style={{ objectFit: "contain" }} 
                            />
                    </div>       
                </div>
            </div>

            <div className="w-full text-center flex-shrink-0">
                <Credits />
            </div>
        </>
    )

}