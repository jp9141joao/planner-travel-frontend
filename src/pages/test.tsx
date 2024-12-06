import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { GoBack } from "@/components/GoBack";
import Credits from "@/components/Credits";
import { BodyPage, BottomPage, MiddlePage, TopPage } from "@/components/LayoutPage/Layouts";

export default function SignIn () {

    return (
        <BodyPage>
            <TopPage>
                <GoBack/>
            </TopPage>
            <MiddlePage>
                <div className="place-items-center" >{/* xxs8:my-4 xxs6:my-[60px] xxs2:my-14 xs:my-11 sm:mt-10 sm:pb-28 md:pb-32 md:mt-14 lg:my-28 lg:mb-0 xl:mt-56 xl:mb-20 2xl:my-28 */}
                    <div className="grid text-center place-items-center leading-tight gap-y-0 text-gray-900 tracking-tight">
                        <p className="xxs11:text-base xxs6:text-lg xxs4:text-xl xxs2:text-2xl xs:text-[18px] sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl">
                            Welcome to
                        </p>
                        <h1 className="xxs11:grid text-center xs:flex xs:justify-center xxs11:text-6xl xxs6:text-7xl xxs2:text-8xl  xs:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl xxs11:-mt-2 xxs8:-mt-2 xxs6:-mt-3 xx2:-mt-4 xs:-mt-2 lg:-mt-3 2xl:-mt-4">
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
                        <p className="text-center xxs11:w-[150px] xxs8:w-[155px] xxs6:w-[160px] xxs4:w-[165px] xxs2:w-[220px] xxs:w-[260px] xs:w-full 2xl:w-auto xxs11:text-base xxs6:text-lg xxs4:text-xl xxs2:text-2xl xs:text-[18px] md:text-xl xl:text-2xl 2xl:text-3xl 2xl:mt-4 xxs11:mt-3 xxs4:mt-4 xs:mt-1 md:mt-2">
                            Let's sign in to your account.
                        </p>
                    </div>
                    <div className="xxs11:mt-4 xs:mt-3 md:mt-4 xl:mt-6" >
                        <div className="grid gap-y-4 xxs11:w-[200px] xxs10:w-[220px] xxs9:w-[240px] xxs8:w-[250px] xxs7:w-[270px] xxs6:w-[280px] xxs5:w-[290px] xxs4:w-[300px] xxs3:w-[310px] xxs2:w-[320px] xxs:w-[350px] xs:w-[270px] sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[450px] 2xl:w-[500px]">
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
                            <div className="flex items-center gap-1.5 w-full">
                                <p>
                                    Forgot your password?
                                </p>
                                <Link to={"/resetPassword"}>
                                    <strong>
                                        Click here.
                                    </strong>
                                </Link>
                            </div>
                            <div className="mt-2 grid gap-1.5 w-full">
                                <Button type="submit">
                                    Sign in
                                </Button>
                            </div>
                            <div className="flex justify-center gap-2 xxs11:text-[12px] xxs5:text-sm xs:text-[12px] sm:text-sm md:text-md xl:text-lg 2xl:text-xl">
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
