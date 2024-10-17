import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import LogoGoogle from "@/assets/icons8-google-48.png"
import Logo from '@/assets/icons8-google-48.png';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { MoveLeft } from 'lucide-react';
import Image from '@/assets/undraw_air_support_re_nybl.svg';
import { CircleHelp } from 'lucide-react';
import Credits from "@/components/Credits";


export default function SignIn () {

    return (
        <div>
            <div className="top-0 font-semibold mt-3 ml-5" style={{display: 'inline-flex'}}>
                <Link to={"/home"}>
                    <h1 className="inline-flex items-center gap-2 text-lg hover:-translate-x-1 transition-all">
                        <MoveLeft className="mt-0.5" />
                        Go back
                    </h1>
                </Link>
            </div>
            <div className="grid grid-cols-2 mx-20 ">
                <div className="hfidden">
                    <img
                        src={Image}
                        className="w-full h-auto"
                    />
                </div>
                <div className="grid gap-y-2 text-start mt-24">
                    <div>
                        <div className="">
                            <div className="grid p-0 m-0 text-center leading-tight gap-y-0">
                                <p className=" mt-4 lg:text-2xl">Welcome to</p>
                                <h1 className="lg:text-8xl -mt-4">
                                    Easy Trip!
                                </h1>
                            </div>
                            <div className="text-center mt-4">
                                <p className="md:text-lg">
                                    Let's sign in to your account.
                                </p>
                            </div>
                        </div>
                        <div className="hfidden mx-20">
                            <div className="mt-1 grid w-full items-center gap-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" placeholder="name@example.com" />
                            </div>
                            <div className="mt-4 grid w-full items-center gap-1.5">
                                <div className="flex gap-1">
                                    <Label htmlFor="password">Password</Label>
                                    <CircleHelp className="w-[15px] h-auto"/>
                                </div>
                                <Input type="password" id="password" placeholder="Abc123" />
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
                            <div className="hidden mt-6 grid w-full items-center">
                                <Button className="w-full h-10 gap-1.5" variant={"outline"}>
                                    <img src={LogoGoogle} /> Sign in with Google
                                </Button>
                            </div>
                            <div className="flex justify-center mt-3 gap-2">
                                <p>Don't have a account? </p>
                                <Link to={""}>
                                    <a className="text-blue-500">Sign up!</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid place-items-center">
                <Credits/>
            </div>
        </div>
    )
}

{
/*
<div>
                <Card className="mt-3 grid max-w-xl justify-center items-center">
                    <CardHeader className="mt-3">
                        <CardTitle>
                            Welcome to Easy Trip
                        </CardTitle>
                        <CardDescription>
                            Lets travel the world!
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="max-w-xl">
                        <div className="mt-1 grid w-full items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" placeholder="name@example.com" />
                        </div>
                        <div className="mt-4 grid w-full items-center gap-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" placeholder="Abc123" />
                        </div>
                        <div className="mt-4 flex w-full items-center gap-1.5">
                            <Checkbox id="remember-me"/>
                            <Label htmlFor="remember-me">Remember for 30 days</Label>
                        </div>
                        <div className="mt-4 grid w-full items-center gap-1.5">
                            <Button className="bg-color-orange hover:bg-hover-color-blue" type="submit">Sign in</Button>
                        </div>
                        <div className="mt-6 flex w-full justify-center items-center gap-1.5 text-center text-xs" >
                            <Separator className="w-36 sm:w-40 md:w-48" />
                            <p className="text-xs"> OR </p>
                            <Separator className="w-36 sm:w-40 md:w-48" />
                        </div>
                        <div className="mt-6 grid w-full items-center">
                            <Button className="w-full h-10 gap-1.5" variant={"outline"}>
                                <img src={Logo} /> Sign in with Google
                            </Button>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-center gap-1.5">
                        <p>Don't have a account? </p>
                        <Link to={""}>
                            <a className="text-blue-500">Sign up!</a>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
*/
}