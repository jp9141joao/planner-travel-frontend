import Image from "@/assets/undraw_maker_launch_re_rq81.svg"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { DatePicker } from "../ui/date-picker"

export default function SignIn(){

    return (
        <div className="grid grid-cols-1 place-items-center">
            <div className="grid place-items-center xl:-mt-10 xl:mb-36">
                <div className="grid text-center leading-tight xl:mb-3">
                    <p className="text-center text-2xl">
                        Join the  family of
                    </p>
                    <h1 className="text-center text-8xl xl:-mt-4 xl:mb-4">
                        Easy Trip!
                    </h1>
                    <p className="text-center text-2xl">
                        Sign up and explore Easy Trip!
                    </p>
                </div>
                <div className="">
                    <div className="grid gap-y-3">
                        <div className="flex gap-2">
                            
                        </div>
                        <div className="flex gap-2">
                            <div className="grid w-full items-center">
                                <Label htmlFor="date">Your birth date</Label>
                                <DatePicker/>
                            </div>
                            <div className="grid w-full items-center">
                                <Label htmlFor="phone">Phone</Label>
                                <Input type="text" id="phone" placeholder="Your Phone number" />
                            </div>
                        </div>
                        <div className="grid w-full items-center">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" placeholder="name@example.com" />
                        </div>
                        <div className="grid w-full items-center">
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" placeholder="Abc123" />
                        </div>
                        <div className="gap-y-3 grid w-full items-center">
                            <Button type="submit">Sign up</Button>
                        </div>
                </div>
                </div>
            </div>    
            <div className="mb-14">
                <img
                    src={Image}
                    className="w-full h-auto"
                />
            </div>        
        </div>
    )

}