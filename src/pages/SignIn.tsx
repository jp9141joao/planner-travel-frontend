"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import Image from '@/assets/undraw_aircraft_re_m05i.svg';
import React, { useState } from "react";
import { BodyPage, BottomPage, MiddlePage, TopPage } from "@/components/LayoutPage/Layouts";
import { GoBack } from "@/components/GoBack";
import { signInUser } from "@/service/userService";
import Credits from "@/components/Credits";
import { useToast } from "@/hooks/use-toast";

export default function SignIn () {

    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const { toast } = useToast()
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();

            const response = await signInUser(email, password);
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/');
            } else {

            }
        } catch (error: any) {

        }
    }

    return (
        <BodyPage>
            <TopPage>
                <GoBack to="home"/>
            </TopPage>
            <MiddlePage>
                <div className="hidden lg:block mx-[2vw]">
                    <img
                        src={Image}
                        className="w-auto h-auto"
                    />
                </div>
                <div>
                    <div className="lg:hidden mx-[17vw] xxs3:mx-[8.8vw] xs:mx-[20.5vw] sm:mx-[15.5vw] my-[2.8vw] xxs5:my-[2.4vw] xs:my-[2vw] sm:my-[3vw]">
                        <img
                            src={Image}
                            className="w-auto h-auto"
                        />
                    </div>
                    <div className='table mx-auto lg:mt-[2vw]'>
                        <div className="grid text-center place-items-center leading-tight gap-y-0 text-gray-900 tracking-tight">
                            <div>
                                <p className="xs:text-start text-[7.6vw] xxs8:text-[7.3vw] xs:text-[5.1vw] lg:text-[1.8vw] leading-tight text-gray-900 tracking-tight">
                                    Welcome to
                                </p>
                            </div>
                            <div>
                                <h1 className="grid text-[22vw] xxs5:text-[21.2vw] xs:text-[15vw] lg:text-[7vw] w-full text-gray-900 tracking-tight leading-[0.6] xxs3:leading-[0.7]">
                                    Easy trip!
                                </h1>
                            </div>
                            <div>
                                <p className="xs:text-start text-[7.6vw] xxs8:text-[7.3vw] xs:text-[5.1vw] lg:text-[1.8vw] mt-[6.2vw] xxs5:mt-[6.9vw] xxs3:mt-[6.4vw] xs:mt-[5.7vw] lg:mt-[2.4vw] leading-tight text-gray-900 tracking-tight">
                                    Let's sign in to your account.
                                </p>
                            </div>
                        </div>
                        <div className="grid place-items-center gap-y-2 xxs11:mt-4 xs:mt-3 md:mt-4 xl:mt-6 px-0 w-full" >
                            <div className="grid gap-1.5 w-full place-items-start">
                                <Label htmlFor="email" className="text-[4vw] xxs5:text-sm sm:text-base lg:text-lg">
                                    Email
                                </Label>
                                <Input 
                                    type="email" 
                                    id="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-1.5 w-full place-items-start">
                                <Label htmlFor="password" className="text-[4vw] xxs5:text-sm sm:text-base lg:text-lg">
                                    Password
                                </Label>
                                <Input 
                                    type="password" 
                                    id="password" 
                                    placeholder="Abc123" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-1.5 w-full text-[4vw] xxs5:text-sm sm:text-base lg:text-lg">
                                <p>
                                    Forgot your password?
                                </p>
                                <Link to={"/resetPassword"}>
                                    <strong>
                                        Click here.
                                    </strong>
                                </Link>
                            </div>
                            <div className="grid gap-1.5 w-full" onSubmit={handleSubmit}>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    toast({
                                    description: "Your message has been sent.",
                                    })
                                }}
                                >
                                Show Toast
                                </Button>
                            </div>
                            <div className="flex justify-center gap-2 text-[4vw] xxs5:text-sm sm:text-base lg:text-lg">
                                <p>
                                    Don't have an account?
                                </p>
                                <Link to={"/signUp"} className="underline">
                                    Sign up!
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </MiddlePage>
            <BottomPage>
                <Credits/>
            </BottomPage>
        </BodyPage>
    )
}