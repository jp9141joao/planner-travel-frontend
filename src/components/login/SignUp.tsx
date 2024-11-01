import Image from "@/assets/undraw_maker_launch_re_rq81.svg"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { DatePicker } from "../ui/date-picker"
import { Link } from "react-router-dom"
import { Checkbox } from "@radix-ui/react-checkbox"
import { CircleHelp } from "lucide-react"

export default function SignIn(){

    return (
        <>
            <div className="">
                <GoBack />
            </div>

            <div className="grid grid-cols-1 place-items-center transi">
                <div className="grid place-items-center xl:mb-36 2xl:mt-[16vh] 2xl:mb-[10vh]">
                    <div className="grid text-center leading-tight xl:mb-3">
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
                    <div className="grid place-items-center xxs:mt-4 md:mt-6 xl:mt-8 gap-y-4">
                        <div className="flex xxs:w-[350px] xs:w-[270px] sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[450px] 2xl:w-[500px] items-center gap-1.5">
                                <div className="grid w-full items-center">
                                    <Label htmlFor="name">Your name</Label>
                                    <Input 
                                        type="text" 
                                        id="phone" 
                                        placeholder="Your name" 
                                    />
                                </div>
                                <div className="grid w-full items-center">
                                    <Label htmlFor="lastName">Last name</Label>
                                    <Input 
                                        type="text" 
                                        id="lastName" 
                                        placeholder="Your last name"
                                    />
                                </div>
                        </div>
                        <div className="flex xxs:w-[350px] xs:w-[270px] sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[450px] 2xl:w-[500px] items-center gap-1.5">
                                <div className="grid w-full items-center">
                                    <Label htmlFor="date">
                                        Your birth date
                                    </Label>
                                    <DatePicker/>
                                </div>
                                <div className="grid w-full items-center">
                                    <Label htmlFor="phone">
                                        Phone
                                        </Label>
                                    <Input 
                                        type="text" 
                                        id="phone" 
                                        placeholder="Your Phone number" 
                                    />
                                </div>
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
                                Sign in
                            </Button>
                        </div>
                        <div className="flex justify-center gap-2">
                            <p>
                                Have a account?
                            </p>
                            <Link to={"/login"}>
                                <a className="underline">
                                    Sign in!
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>    
                <div className="w-full h-[36vw] mb-[10vh]">
                        <img 
                            src={Image} 
                            className="w-full h-full" 
                            style={{ objectFit: "contain" }} 
                        />
                    </div>        
            </div>

            <div className="">
                <Credits />
            </div>
        </>
    )

}