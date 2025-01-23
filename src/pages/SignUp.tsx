import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from '@/assets/undraw_world_re_768g.svg';
import { BodyPage, BottomPage, MiddlePage, TopPage } from "@/components/LayoutPage/Layouts";
import { GoBack } from "@/components/GoBack";
import Credits from "@/components/Credits";
import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { signUpUser } from "@/service/service";
import { useNavigate } from "react-router-dom";
import { User } from "@/types/types";

export default function SignIn () {

    const [ fullName, setFullName ] = useState<string>('');
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ toastMessage, setToastMessage ] = useState({
        variant: '', title: '', description: ''
    });
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ showToast, setShowToast ] = useState<boolean>(false);
    const [ status, setStatus ] = useState<number>(0);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            const response = await signUpUser({ fullName: fullName, email: email, password: password } as User);
            console.log(response.error);

            if (response.success) {
                setStatus(1);
            } else {
                if (response.error == 'Error: The value of fullName is invalid!') {
                    setStatus(2);
                } else if (response.error == 'Error: The value of fullName is too large!') {
                    setStatus(3);
                } else if (response.error == 'Error: The value of email is invalid!') {
                    setStatus(4);
                } else if (response.error == 'Error: The value of email is too large!') {
                    setStatus(5);
                } else if (response.error == 'Error: The value of password is invalid!') {
                    setStatus(6);
                } else if (response.error == 'Error: the value of password is too short!') {
                    setStatus(7);
                } else if (response.error == 'Error: The value of password is too large!') {
                    setStatus(8);
                } else if (response.error == 'Error: There is already a user using this email!') {
                    setStatus(9)
                } else {
                    setStatus(10)
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
                    variant: 'success',
                    title: 'Account created successfully!',
                    description: 'Welcome! Your account has been created. You can now plan your travels with us.',
                });
            } else if (status == 2) {
                setToastMessage({
                    variant: 'destructive',
                    title: 'Invalid Full Name',
                    description: 'Please provide a valid full name with only letters and spaces.',
                });
            } else if (status == 3) {
                setToastMessage({
                    variant: 'destructive',
                    title: 'Full Name Too Long',
                    description: 'Your full name is too long. Please enter a shorter name.',
                });
            } else if (status == 4) {
                setToastMessage({
                    variant: 'destructive',
                    title: 'Invalid Email',
                    description: 'The email address you entered is invalid. Please check and try again.',
                });
            } else if (status == 5) {
                setToastMessage({
                    variant: 'destructive',
                    title: 'Email Too Long',
                    description: 'The email address is too long. Please enter a shorter email address.',
                });
            } else if (status == 6) {
                setToastMessage({
                    variant: 'destructive',
                    title: 'Invalid Password',
                    description: 'Please provide a password that meets the minimum criteria, including at least one uppercase letter, one number, and one special character.',
                });
            } else if (status == 7) {
                setToastMessage({
                    variant: 'destructive',
                    title: 'Password Too Short',
                    description: 'Your password is too short. Please enter a password with at least 8 characters.',
                });
            } else if (status == 8) {
                setToastMessage({
                    variant: 'destructive',
                    title: 'Password Too Long',
                    description: 'Your password is too long. Please enter a shoter password.',
                });
            } else if (status == 9) {
                setToastMessage({
                    variant: 'destructive',
                    title: 'Email Already in Use',
                    description: 'Error: There is already a user using this email. Please use a different email address or log in to your account.',
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

        //setStatus(0);
    }, [toastMessage]);

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (token) {
            localStorage.removeItem('authToken');
        }
    }, []);

    return (
        <BodyPage>
            <TopPage>
                <GoBack to="signIn"/>
            </TopPage>
            <MiddlePage>
                <form className='mt-[1vw] xxs3:mt-[10vw] xs:mt-[2vw] sm:mt-[7vw] lg:mt-0 lg:mb-[3vw]' onSubmit={handleSubmit}>
                    <div className="grid text-center place-items-center leading-tight gap-y-0 text-gray-900 tracking-tight">
                            <div>
                                <p className="xs:text-start text-[7vw] xxs8:text-[6.9vw] xxs3:text-[6.8vw] xs:text-[4.75vw] lg:text-[2.1vw] leading-tight text-gray-900 tracking-tight">
                                    Join the family of
                                </p>
                            </div>
                            <div>
                                <h1 className="grid text-[22vw] xxs5:text-[20.8vw] xxs3:text-[21.2vw] xs:text-[15vw] lg:text-[7vw] w-full text-gray-900 tracking-tight leading-[0.7]">
                                    Easy trip!
                                </h1>
                            </div>
                            <div>
                                <p className="xs:text-start text-[7vw] xxs8:text-[6.8vw] xs:text-[4.75vw] lg:text-[2.1vw] mt-[6.2vw] xxs5:mt-[7vw] xxs3:mt-[7.8vw] xs:mt-[5.7vw] lg:mt-[2.2vw] leading-tight text-gray-900 tracking-tight">
                                    Sign up and explore the world.
                                </p>
                            </div>
                    </div>
                    <div className="grid place-items-center gap-y-1 xxs3:gap-y-2 xxs11:mt-[3vw] xs:mt-3 md:mt-4 xl:mt-6 px-0 w-full" >
                        <div className="grid gap-1.5 w-full place-items-start">
                            <Label htmlFor="fullName" className="text-[4vw] xxs5:text-sm sm:text-base lg:text-lg">
                                Full name
                            </Label>
                            <Input 
                                type="text" 
                                id="fullName"
                                placeholder="Your full name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                onClick={() => setStatus(0)}
                                className={status == 2 || status == 3 ? "border-red-500 " : "" }
                            />
                        </div>
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
                                className={status == 4 || status == 5 ? "border-red-500 " : "" }
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
                                className={status >= 6 && status <= 8 ? "border-red-500 " : "" }
                            />
                        </div>
                        <div className="grid gap-1.5 w-full mt-2">
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
                                    : "Sign Up"
                                }
                            </Button>
                            <Toaster />
                        </div>
                        
                    </div>
                </form>
                <div className="mx-[24vw] xxs3:mx-[6vw] xs:mx-[27vw] sm:mx-[20vw] lg:mx-[2vw] my-[2.8vw] xxs5:my-[2.4vw] xs:my-0">
                    <img
                        src={Image}
                        className="w-auto h-auto"
                    />
                </div>
            </MiddlePage>
            <BottomPage>
                <Credits/>
            </BottomPage>
        </BodyPage>
    )
}