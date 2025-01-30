import Credits from "@/components/Credits"
import { GoBack } from "@/components/GoBack"
import { BodyPage, BottomPage, MiddlePageOneCol, TopPage } from "@/components/LayoutPage/Layouts"
import React, { useEffect, useState } from "react"
import Image from "../assets/undraw_pic-profile_nr49.svg"
import { toast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { UpdateUserData, User, UserDetails } from "@/types/types"
import { LogOut } from "lucide-react"
import { updateUserData } from "@/service/service"
import { getItemSessionStorage, setItemSessionStorage } from "@/components/utils/utils"
import { LoadData } from "@/components/LoadData"

export function ProfileSettings() {
    const [ fullName, setFullName ] = useState<string | undefined>('');
    const [ email, setEmail ] = useState<string | undefined>('');
    const [ toastMessage, setToastMessage ] = useState({
        variant: '', title: '', description: ''
    });
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ showToast, setShowToast ] = useState<boolean>(false);
    const [ status, setStatus ] = useState<number>(0);
    const [ buttonDisabled, setButtonDisabled ] = useState<boolean>(true);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            const response = await updateUserData({fullName: fullName, email: email} as UpdateUserData);
            
            if (response.success) {
                const userData = getItemSessionStorage('user');
            
                if (userData) {
                    setItemSessionStorage('user', {
                        ...userData,
                        fullName: fullName,
                        email: email
                    });
                }

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
                } else if (response.error == 'Error: There is already a user using this email!') {
                    setStatus(6);
                } else {
                    setStatus(7);
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
        const userData: UserDetails | null = getItemSessionStorage('user');

        if (userData) {
            setFullName(userData.fullName);
            setEmail(userData.email);
        } else {
            setFullName(undefined);
            setEmail(undefined)
        }    
    }, []);

    useEffect(() => {
        if (!fullName || !email) {
            setStatus(7);
        }

        const userData: UserDetails | null = getItemSessionStorage('user');

        if (userData) {
            if (userData.fullName != fullName || userData.email != email) {
                setButtonDisabled(false);
            } else {
                setButtonDisabled(true);
            }
        }
    }, [fullName, email])

    useEffect(() => {
            if (!isLoading && showToast) {
                if (status == 1) {
                    setToastMessage({
                        variant: 'success',
                        title: 'Information updated successfully!',
                        description: 'Your changes have been saved. Everything is up to date!',
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
            });

            if (status == 1) {
                setButtonDisabled(true);
            }
            
            setStatus(0);
        }
    }, [toastMessage]);

    return (
        <BodyPage>
            <TopPage>
                <div className="flex justify-between">
                    <GoBack to="home" />
                    <div className="cursor-pointer mt-3 mr-5 hover:translate-x-1 transition-all" onClick={() => {
                        localStorage.clear();
                        sessionStorage.clear();
                        window.location.reload();
                    }}>
                        <LogOut/>
                    </div>
                </div>
            </TopPage>
            <MiddlePageOneCol>
                <form className="grid place-items-center" onSubmit={handleSubmit}>
                    <div>
                        <h1 className="grid text-[16.1vw]  xxs8:text-[15.8vw] xs:text-[10.8vw] lg:text-[5.2vw] w-full text-gray-900 tracking-tight leading-[0.6] xxs3:leading-[0.7]">
                            Your Details
                        </h1>
                    </div>
                    <div>
                        <p className="xs:text-start text-[8.7vw] xxs8:text-[8.4vw] xs:text-[5.9vw] lg:text-[2.1vw] mt-[4vw] xxs5:mt-[3.2vw] xs:mt-[5.7vw] lg:mt-[1.2vw] leading-tight text-gray-900 tracking-tight">
                            Update your information
                        </p>
                    </div>
                    <div className="grid place-items-center gap-y-2 mt-3 px-0 w-full" >
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
                                className={status == 2|| status == 3 ? "border-red-500 " : "" }
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
                                className={status >= 4 && status <= 6 ? "border-red-500 " : "" }
                            />
                        </div>
                        <div className="grid gap-1.5 w-full mt-1.5">
                            <Button type="submit" disabled={buttonDisabled}>
                                {
                                    isLoading ? 
                                    <div role="status">
                                        <svg aria-hidden="true" className="w-8 h-8 text-white animate-spin fill-white py-1" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5533C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.723 75.2124 7.41289C69.5422 4.10285 63.2754 1.94025 56.7222 1.05197C51.7666 0.3679 46.7398 0.446843 41.8198 1.27873C39.297 1.6983 37.8255 4.19778 38.4626 6.62326C39.0998 9.04874 41.5717 10.4717 44.0965 10.1071C47.8511 9.53005 51.7015 9.52622 55.4656 10.0962C60.878 10.9201 65.9925 13.1373 70.396 16.5714C74.7995 20.0055 78.3892 24.5698 80.8418 29.841C83.0456 34.3696 84.5159 39.246 85.1999 44.2728C85.6531 47.6269 88.1603 50.0379 91.5303 50.0379C91.9338 50.0379 92.3423 49.9962 92.7521 49.9106C95.209 49.4046 96.5425 46.9181 95.9355 44.4609C95.324 41.9793 94.5211 39.5402 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                        <span className="sr-only">Carregando...</span>
                                    </div>
                                    : "Save"
                                }
                            </Button>
                            <Toaster />
                        </div>
                    </div>
                </form>
            </MiddlePageOneCol>
            <BottomPage>
                <Credits />
            </BottomPage>
        </BodyPage>
    )
}