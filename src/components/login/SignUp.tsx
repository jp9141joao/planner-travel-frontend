import Image from "@/assets/undraw_departing_re_mlq3.svg"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"

export default function SignIn(){

    return (
        <div className="grid grid-cols-2 place-items-center -mt-20 mb-20 mx-20">
            <div className="grid place-items-center ml-36">
                <div className="grid text-center leading-tight gap-y-0">
                    <p className="text-center text-2xl">Join the</p>
                    <h1 className="text-center text-8xl -mt-4">Easy Trip!</h1>
                    <p className="text-center text-8xl" style={{ fontFamily: '"Shadows Into Light", cursive', fontWeight: 400, fontStyle: 'normal' }}>Family</p>
                </div>
                <div className="mx-24 mt-4">
                    <div className="grid gap-y-3">
                        <div className="flex gap-2">
                            <div className="grid w-full items-center">
                                <Label htmlFor="name">Name</Label>
                                <Input type="text" id="name" placeholder="Your name" />
                            </div>
                            <div className="grid w-full items-center">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input type="text" id="lastName" placeholder="Your last name" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="grid w-full items-center">
                                <Label htmlFor="date">Your birth date</Label>
                                <Input type="text" id="date" placeholder="Your last name" />
                            </div>
                            <div className="grid w-full items-center">
                                <Label htmlFor="name">Cellphone</Label>
                                <Input type="text" id="name" placeholder="Your cellphone number" />
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
            <div className="pt-16">
                <img
                    src={Image}
                    className="w-full h-auto"
                />
            </div>        
        </div>
    )

}