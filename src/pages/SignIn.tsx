"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import Image from '@/assets/undraw_aircraft_re_m05i.svg';
import React, { useEffect, useState } from "react";
import { BodyPage, BottomPage, MiddlePage, TopPage } from "@/components/LayoutPage/Layouts";
import { GoBack } from "@/components/GoBack";
import { getUser, signInUser } from "@/service/service";
import Credits from "@/components/Credits";
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/hooks/use-toast"
import { Login, User } from "@/types/types";
import { useUser } from "@/components/Contex/contex";

export default function SignIn () {

    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ toastMessage, setToastMessage ] = useState({
        variant: '', title: '', description: ''
    });
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ showToast, setShowToast ] = useState<boolean>(false);
    const [ status, setStatus ] = useState<number>(0);
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
            try {
                e.preventDefault();
                setIsLoading(true);
                const response = await signInUser({ email, password } as Login);
                
                if (response.data.success) {
                    localStorage.setItem('authToken', response.data.data);
                    const userData = await getUser();

                    if (!userData) {
                        throw new Error('User data could not be retrieved from the token. Please try again.');
                    }

                    setUser(userData.data);
                    navigate('/home');
                } else {
                    if (response.data.error == 'Error: The value of email is invalid!') {
                        setStatus(1);
                    } else if (response.data.error == 'Error: The value of password is invalid!') {
                        setStatus(2);
                    } else if (response.data.error == 'Error: The email or password you entered is incorrect!') {
                        setStatus(3);
                    } else {
                        setStatus(4);
                    }
                }
    
                setIsLoading(false);
                setShowToast(true);
            } catch (error: any) {
                setStatus(8);
                setIsLoading(false);
                setShowToast(true);
                console.log(error);
            } 
        }
    
        useEffect(() => {
            if (!isLoading && showToast) {
                if (status == 1) {
                    setToastMessage({
                        variant: 'destructive',
                        title: 'Invalid Email',
                        description: 'The email address you entered is invalid. Please check and try again.',
                    });
                } else if (status == 2) {
                    setToastMessage({
                        variant: 'destructive',
                        title: 'Invalid Password',
                        description: 'The password you entered is invalid. Please check and try again.',
                    });
                } else if (status == 3) {
                    setToastMessage({
                        variant: 'destructive', 
                        title: 'Email or Password Incorrect', 
                        description: 'The email or password you entered is incorrect. Please try again.', 
                    }); 
                } else {
                    setToastMessage({
                        variant: 'destructive',
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with your request.",
                    });
                }
            }
        }, [isLoading, showToast, status]);
    
        useEffect(() => {
            if (showToast && status != 0) {
                toast({
                    variant: toastMessage.variant == 'destructive' ? 'destructive' : 'success',
                    title: toastMessage.title,
                    description: toastMessage.description,
                })
            }
        }, [toastMessage]);

        useEffect(() => {
            
        }, [localStorage.getItem('authToken')])

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
                <form onSubmit={handleSubmit}>
                    <div className="lg:hidden mx-[17vw] xxs3:mx-[8.8vw] xs:mx-[20.5vw] sm:mx-[15.5vw] my-[2.8vw] xxs5:my-[2.4vw] xs:my-[2vw] sm:my-[3vw]">
                        <img
                            src={Image}
                            className="w-auto h-auto"
                        />
                    </div>
                    <div className='table mx-auto'>
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
                                    onClick={() => setStatus(0)}
                                    className={status == 1 || status == 3 ? "border-red-500 " : "" }
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
                                    onClick={() => setStatus(0)}
                                    className={status == 2 || status == 3 ? "border-red-500 " : "" }
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
                            <div className="grid gap-1.5 w-full">
                                <Button type="submit">
                                    {
                                        isLoading ? 
                                        <div role="status">
                                            <svg aria-hidden="true" className="w-8 h-8 text-white animate-spin fill-white py-1" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5533C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.723 75.2124 7.41289C69.5422 4.10285 63.2754 1.94025 56.7222 1.05197C51.7666 0.3679 46.7398 0.446843 41.8198 1.27873C39.297 1.6983 37.8255 4.19778 38.4626 6.62326C39.0998 9.04874 41.5717 10.4717 44.0965 10.1071C47.8511 9.53005 51.7015 9.52622 55.4656 10.0962C60.878 10.9201 65.9925 13.1373 70.396 16.5714C74.7995 20.0055 78.3892 24.5698 80.8418 29.841C83.0456 34.3696 84.5159 39.246 85.1999 44.2728C85.6531 47.6269 88.1603 50.0379 91.5303 50.0379C91.9338 50.0379 92.3423 49.9962 92.7521 49.9106C95.209 49.4046 96.5425 46.9181 95.9355 44.4609C95.324 41.9793 94.5211 39.5402 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                            <span className="sr-only">Carregando...</span>
                                        </div>
                                        : "Sign In"
                                    }
                                </Button>
                                <Toaster />
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
                </form>
            </MiddlePage>
            <BottomPage>
                <Credits/>
            </BottomPage>
        </BodyPage>
    )
}

