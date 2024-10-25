import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import Image from '@/assets/undraw_air_support_re_nybl.svg';
import { CircleHelp } from 'lucide-react';
import { ArrowUpDown } from 'lucide-react';



export default function SignIn () {

    return (
        <div className="grid place-items-center">
            <div className="grid grid-cols-1">
                <div className="w-full h-[60vw]">
                    <img 
                        src={Image} 
                        className="w-full h-full" 
                        style={{ objectFit: "contain" }} 
                    />
                </div>
                <div className="grid gap-y-2 text-start xxs:mt-20 sm:mt-24 lg:mt-28 2xl:mt-[15vh] 2xl:mb-[27vh]">
                    <div>
                        <div className="grid place-items-center text-center leading-tight gap-y-0 text-gray-900 tracking-tight">
                            <p className="xxs11:text-sm xxs6:text-sm xxs3:text-md xxs2:text-base xxs:text-3xl xs:text-[18px] sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl">Welcome to</p>
                            <h1 className="xxs11:grid text-center xs:flex xs:justify-center xxs11:text-[26px] xxs10:text-[28px] xxs9:text-3xl xxs8:text-[32px] xxs7:text-4xl xxs6:text-[40px] xxs5:text-[44px] xxs4:text-5xl xxs3:text-[52px] xxs2:text-[56px] xxs:text-9xl xs:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl xxs:-mt-4 xs:-mt-2 lg:-mt-3 2xl:-mt-4">
                                <span className="block">Easy</span>
                                <span className="hidden xs:block">&nbsp;</span>
                                <span className="block">Trip!</span>
                            </h1>
                            <p className="text-center xxs:w-[320px] 2xl:w-auto xxs11:text-sm xxs6:text-sm xxs3:text-md xxs2:text-base xxs:text-3xl xs:text-[18px] md:text-xl xl:text-2xl 2xl:text-3xl 2xl:mt-4 xxs:mt-4 xs:mt-1 md:mt-2">
                                Let's sign in to your account.
                            </p>
                        </div>
                        <div className="grid place-items-center xxs:mt-4 md:mt-6 xl:mt-8 gap-y-4">
                            <div className="grid xxs:w-[350px] xs:w-[270px] sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[450px] 2xl:w-[500px] items-center gap-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" placeholder="name@example.com" />
                            </div>
                            <div className="grid xxs:w-[350px] xs:w-[270px] sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[450px] 2xl:w-[500px] items-center gap-1.5">
                                <div className="flex gap-1">
                                    <Label htmlFor="password">Password</Label>
                                    <CircleHelp className="w-[15px] h-auto"/>
                                </div>
                                <Input type="password" id="password" placeholder="Abc123" />
                            </div>
                            <div className="flex xxs:w-[350px] xxs:w-[320px] xs:w-[270px] sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[450px] 2xl:w-[500px] items-center gap-1.5">
                                <Checkbox id="remember-me"/>
                                <Label htmlFor="remember-me">Remember for 30 days</Label>
                            </div>
                            <div className="mt-2 grid xxs:w-[350px] xs:w-[270px] sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[450px] 2xl:w-[500px] items-center gap-1.5">
                                <Button type="submit">Sign in</Button>
                            </div>
                            <div className="flex justify-center gap-2">
                                <p>Don't have a account? </p>
                                <Link to={""}>
                                    <a className="underline">Sign up!</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}