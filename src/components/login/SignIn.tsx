import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import Image from '@/assets/undraw_aircraft_re_m05i.svg';
import { GoBack } from "../GoBack";
import Credits from "../Credits";
import { BodyPage, BottomPage, MiddlePage, TopPage } from "../LayoutPage/Layouts";


export default function SignIn () {

    return (
        <BodyPage>
            <TopPage>
                <GoBack/>
            </TopPage>
            <MiddlePage>
                <div className="hidden lg:block mx-[2vw]"  style={{border: '1px solid red'}}>
                    <img
                        src={Image}
                        className="w-auto h-auto"
                    />
                </div>
                <div  style={{border: '1px solid red'}}>
                    <div className="lg:hidden mx-[11vw] xxs3:mx-[8.8vw] xs:mx-[15.5vw] my-[2.8vw] xxs5:my-[2.4vw] xs:my-0"  style={{border: '1px solid red'}}>
                        <img
                            src={Image}
                            className="w-auto h-auto"
                        />
                    </div>
                    <div className='table mx-auto'  style={{border: '1px solid red'}}>
                        <div className="grid text-center place-items-center leading-tight gap-y-0 text-gray-900 tracking-tight">
                                <div  style={{border: '1px solid red'}}>
                                    <p className="xs:text-start text-[7.6vw] xxs8:text-[7.3vw] xs:text-[5.1vw] lg:text-[1.8vw] leading-tight text-gray-900 tracking-tight">
                                        Welcome to
                                    </p>
                                </div>
                                <div  style={{border: '1px solid red'}}>
                                    <h1 className="grid text-[22vw] xxs5:text-[21.2vw] xs:text-[15vw] lg:text-[7vw] w-full text-gray-900 tracking-tight leading-[0.7] xs:leading-[0.7]">
                                        Easy trip!
                                    </h1>
                                </div>
                                <div  style={{border: '1px solid red'}}>
                                    <p className="xs:text-start text-[7.6vw] xxs8:text-[7.3vw] xs:text-[5.1vw] lg:text-[1.8vw] mt-[6.2vw] xxs5:mt-[6.4vw] xs:mt-[5.7vw] lg:mt-[2.4vw] leading-tight text-gray-900 tracking-tight">
                                        Let's sign in to your account.
                                    </p>
                                </div>
                        </div>
                        <div  style={{border: '1px solid red'}} className="grid place-items-center gap-y-2 xxs3:gap-y-4 xxs11:mt-4 xs:mt-3 md:mt-4 xl:mt-6 px-0 w-full" >
                            <div className="grid gap-1.5 w-full place-items-start">
                                <Label htmlFor="email" className="text-[4vw] xxs5:text-sm sm:text-base lg:text-lg">
                                    Email
                                </Label>
                                <Input 
                                    type="email" 
                                    id="email"
                                    placeholder="name@example.com"
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
                                    Sign in
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