import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import Image from '@/assets/undraw_world_re_768g.svg';
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
                <div>
                    <div className='table mx-auto lg:mt-[2vw]'>
                        <div className="grid text-center place-items-center leading-tight gap-y-0 text-gray-900 tracking-tight">
                                <div>
                                    <p className="xs:text-start text-[7vw] xxs8:text-[6.8vw] xs:text-[4.75vw] lg:text-[2.1vw] leading-tight text-gray-900 tracking-tight">
                                        Welcome to
                                    </p>
                                </div>
                                <div>
                                    <h1 className="grid text-[22vw] xxs5:text-[21.2vw] xs:text-[15vw] lg:text-[7vw] w-full text-gray-900 tracking-tight leading-[0.7] xs:leading-[0.7]">
                                        Easy trip!
                                    </h1>
                                </div>
                                <div>
                                    <p className="xs:text-start text-[7vw] xxs8:text-[6.8vw] xs:text-[4.75vw] lg:text-[2.1vw] mt-[6.2vw] xxs5:mt-[6.4vw] xs:mt-[5.7vw] lg:mt-[2.4vw] leading-tight text-gray-900 tracking-tight">
                                        Sign up and explore the world.
                                    </p>
                                </div>
                        </div>
                        <div className="grid place-items-center gap-y-2 xxs3:gap-y-4 xxs11:mt-4 xs:mt-3 md:mt-4 xl:mt-6 px-0 w-full" >
                            <div className="grid gap-1.5 w-full place-items-start">
                                <Label htmlFor="fullName" className="text-[4vw] xxs5:text-sm sm:text-base lg:text-lg">
                                    Full name
                                </Label>
                                <Input 
                                    type="text" 
                                    id="fullName"
                                    placeholder="Your full name"
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
                            
                            <div className="grid gap-1.5 w-full">
                                <Button type="submit">
                                    Sign up
                                </Button>
                            </div>
                            <div className="flex justify-center gap-2 text-[4vw] xxs5:text-sm sm:text-base lg:text-lg">
                                <p>
                                    Have an account?
                                </p>
                                <Link to={"/signIn"} className="underline">
                                    Sign up!
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="lg:hidden mx-[6vw] xxs3:mx-[6vw] xs:mx-[15.5vw] my-[2.8vw] xxs5:my-[2.4vw] xs:my-0">
                        <img
                            src={Image}
                            className="w-auto h-auto"
                        />
                    </div>
                </div>
                <div className="hidden lg:block mx-[2vw]">
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