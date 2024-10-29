import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import Image from '@/assets/undraw_air_support_re_nybl.svg';
import Image2 from "@/assets/undraw_outdoor_adventure_re_j3b7.svg"
import { CircleHelp } from 'lucide-react';
import { ArrowUpDown } from 'lucide-react';
import { GoBack } from "../GoBack";
import Credits from "../Credits";



export default function SignIn () {

    return (
        <>
            <div>
                <GoBack />
            </div>

            <div className="flex min-h-screen flex-col">
                <div className="grid grid-cols-1 flex-grow">
                    <div className="w-full mt-[5vh]">
                        <img 
                            src={Image} 
                            className="w-full h-auto xl:px-[20vw] px-0 ml-[5vw]"  
                            style={{ objectFit: "contain" }} 
                        />
                    </div>
        
                    <div className="flex flex-col flex-grow">
                        <div className="grid grid-cols-1 place-items-center text-center leading-tight gap-y-0 text-gray-900 tracking-tight">
                            <p className="xxs11:text-sm xxs6:text-sm xxs3:text-md xxs2:text-xl xxs2:text-2xl xs:text-[18px] sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl">Welcome to</p>
                            <h1 className="xxs11:grid text-center xs:flex xs:justify-center xxs11:text-[26px] xxs10:text-[28px] xxs9:text-3xl xxs8:text-[32px] xxs7:text-4xl xxs6:text-8xl xs:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl xxs2:-mt-3 xx2:-mt-4 xs:-mt-2 lg:-mt-3 2xl:-mt-4">
                                <span className="block">Easy</span>
                                <span className="hidden xs:block">&nbsp;</span>
                                <span className="block">Trip!</span>
                            </h1>
                            <p className="text-center xxs3:w-[170px] xxs2:w-[220px] xxs:w-[260px] 2xl:w-auto xxs11:text-sm xxs6:text-2xl xs:text-[18px] md:text-xl xl:text-2xl 2xl:text-3xl 2xl:mt-4 xxs6:mt-4 xs:mt-1 md:mt-2">
                                Let's sign in to your ahytyhtccount.
                            </p>
                        </div>
                        <div className="grid place-items-center">
                        <div className="grid gap-y-4 xxs11:w-[200px] xxs10:w-[220px] xxs9:w-[240px] xxs8:w-[250px] xxs7:w-[270px] xxs6:w-[280px] xxs5:w-[290px] xxs4:w-[300px] xxs3:w-[310px] xxs2:w-[320px] xxs:w-[350px] xs:w-[270px] sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[450px] 2xl:w-[500px]">
                                <div className="grid gap-1.5 w-full ">
                                    <Label htmlFor="email">Email</Label>
                                    <Input type="email" id="email" placeholder="name@example.com" />
                                </div>
                                <div className="grid gap-1.5 w-full">
                                    <div className="flex gap-1">
                                        <Label htmlFor="password">Password</Label>
                                        <CircleHelp className="w-[15px] h-auto"/>
                                    </div>
                                    <Input type="password" id="password" placeholder="Abc123" />
                                </div>
                                <div className="flex items-center gap-1.5 w-full">
                                    <Checkbox id="remember-me"/>
                                    <Label htmlFor="remember-me">Remember for 30 days</Label>
                                </div>
                                <div className="mt-2 grid gap-1.5 w-full">
                                    <Button type="submit">Sign in</Button>
                                </div>
                                <div className="flex justify-center gap-2">
                                    <p>Don't have an account?</p>
                                    <Link to={"/test"} className="underline">
                                        Sign up!
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-grow flex-col">
                <div className="text-center relative bottom-0 w-full">
                    <Credits />
                </div>`
            </div>
        </>
    )
}