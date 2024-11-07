import Image from "@/assets/undraw_maker_launch_re_rq81.svg"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"
import { GoBack } from "../GoBack";
import Credits from "../Credits";

export default function SignIn(){

    return (
        <>
            <div className="">
                <GoBack />
            </div>

            <div className="flex min-h-screen flex-col">
                <div className="grid grid-cols-1 flex-grow">
                    <div className="grid place-items-center xxs11:my-[5vh] xs:my-[12vh] xl:my-[9vw] 2xl:my-[9vw]">
                        <div className="grid text-center leading-tight">
                            <p className="xxs11:text-base xxs6:text-lg xxs4:text-xl xxs2:text-2xl xs:text-[18px] sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl">
                                Join the  family of
                            </p>
                            <h1 className="3xl:underline xxs11:grid text-center xs:flex xs:justify-center xxs11:text-6xl xxs6:text-7xl xxs2:text-8xl  xs:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl xxs11:-mt-2 xxs8:-mt-2 xxs6:-mt-3 xx2:-mt-4 xs:-mt-2 lg:-mt-3 2xl:-mt-4">
                                <span className="block">
                                    Easy
                                </span>
                                <span className="hidden xs:block">
                                    &nbsp;
                                </span>
                                <span className="block">
                                    Trip!
                                </span>
                            </h1>
                            <p className="text-center xxs11:w-[150px] xxs8:w-[155px] xxs6:w-[160px] xxs4:w-[185px] xxs2:w-[230px] xxs:w-[250px] xs:w-full 2xl:w-auto xxs11:text-base xxs6:text-lg xxs4:text-xl xxs2:text-2xl xs:text-[18px] md:text-xl xl:text-2xl 2xl:text-3xl 2xl:mt-5 xxs11:mt-3 xxs4:mt-4 xs:mt-1 md:mt-2">
                                Sign up and explore the world.
                            </p>
                        </div>
                        <div className="xxs11:mt-4 xs:mt-3 md:mt-4 xl:mt-6">
                            <div className="grid gap-y-4 xxs11:w-[200px] xxs10:w-[220px] xxs9:w-[240px] xxs8:w-[250px] xxs7:w-[270px] xxs6:w-[280px] xxs5:w-[290px] xxs4:w-[300px] xxs3:w-[310px] xxs2:w-[320px] xxs:w-[350px] xs:w-[270px] sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[450px] 2xl:w-[500px]">
                                <div className="grid gap-1.5 w-full ">
                                    <Label htmlFor="fullName">
                                        Full name
                                    </Label>
                                    <Input 
                                        type="text" 
                                        id="fullName"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div className="grid gap-1.5 w-full ">
                                    <Label htmlFor="email">
                                        Email
                                    </Label>
                                    <Input 
                                        type="email" 
                                        id="email"
                                        placeholder="name@example.com"
                                    />
                                </div>
                                <div className="grid gap-1.5 w-full">
                                    <Label htmlFor="password">
                                        Password
                                    </Label>
                                    <Input 
                                        type="password" 
                                        id="password" 
                                        placeholder="Abc123" 
                                    />
                                </div>
                                <div className="mt-2 grid gap-1.5 w-full">
                                    <Button type="submit">
                                        Sign up
                                    </Button>
                                </div>
                                <div className="flex justify-center gap-2 xxs11:text-[12px] xxs5:text-sm xs:text-[12px] sm:text-sm md:text-md xl:text-lg 2xl:text-xl">
                                    <p>
                                        Have an account?
                                    </p>
                                    <Link to={"/signIn"} className="underline">
                                        Sign in!
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>    
                    <div className="w-full h-[60vw]">
                        <img 
                            src={Image} 
                            className="w-full h-full" 
                            style={{ objectFit: "contain" }} 
                        />
                    </div>
                </div>
            </div>

            <div className="w-full text-center flex-shrink-0 mt-auto mt-[6vw]"> 
                <Credits />
            </div>
        </>
    )

}