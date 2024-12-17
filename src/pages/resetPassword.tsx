import Credits from "@/components/Credits";
import { GoBack } from "@/components/GoBack";
import { BodyPage, BottomPage, MiddlePage, MiddlePageOneCol, TopPage } from "@/components/LayoutPage/Layouts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function ResetPassword() {
    return (
        <BodyPage>
            <TopPage>
                <GoBack to="signIn"/>
            </TopPage>
            <MiddlePageOneCol>
                <div className='mt-[3vw] xxs3:mt-[10vw] xs:mt-[2vw] sm:mt-[7vw] lg:mt-0 lg:mb-[3vw]'>
                    <div className="grid text-center place-items-center leading-tight gap-y-0 text-gray-900 tracking-tight">
                            <div>
                                <h1 className="grid text-[14.2vw] xxs5:text-[20.8vw] xxs3:text-[21.2vw] xs:text-[15vw] lg:text-[4vw] w-full text-gray-900 tracking-tight leading-[1]">
                                    Password Reset
                                </h1>
                            </div>
                            <div>
                                <p className="xs:text-start text-[8vw] xxs8:text-[6.8vw] xs:text-[4.75vw] lg:text-[1.8vw] mt-[6.2vw] xxs5:mt-[7.8vw] xs:mt-[5.7vw] lg:mt-[0.6vw] leading-tight text-gray-900 tracking-tight">
                                    Create a new password.
                                </p>
                            </div>
                    </div>
                    <div className="grid place-items-center gap-y-1 xxs3:gap-y-2 xxs11:mt-[3vw] xs:mt-3 md:mt-4 xl:mt-[0.7vw] px-0 w-full" >
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
                        <div className="grid gap-1.5 w-full place-items-start">
                            <Label htmlFor="newPassword" className="text-[4vw] xxs5:text-sm sm:text-base lg:text-lg">
                                New Password
                            </Label>
                            <Input 
                                type="password" 
                                id="newPassword" 
                                placeholder="Cba321" 
                            />
                        </div>
                        <div className="grid gap-1.5 w-full mt-2">
                            <Button type="submit">
                                Sign up
                            </Button>
                        </div>
                        
                    </div>
                </div>
            </MiddlePageOneCol>
            <BottomPage>
                <Credits/>
            </BottomPage>
        </BodyPage>
    )
}