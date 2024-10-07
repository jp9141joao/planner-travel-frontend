import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import Logo from '@/assets/icons8-google-48.png';
import Image from "@/assets/undraw_Travelers_re_y25a.png";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";

export default function SignIn () {

    return (
        <div className="sm-col-1 lg-col-2">
            <div>
                <Card className="mt-3 grid max-w-xl justify-center items-center">
                    <CardHeader className="mt-3">
                        <CardTitle>
                            Welcome to Easy Trip
                        </CardTitle>
                        <CardDescription>
                            Lets travel the world!
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="max-w-xl">
                        <div className="mt-1 grid w-full items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" placeholder="name@example.com" />
                        </div>
                        <div className="mt-4 grid w-full items-center gap-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" placeholder="Abc123" />
                        </div>
                        <div className="mt-4 flex w-full items-center gap-1.5">
                            <Checkbox id="remember-me"/>
                            <Label htmlFor="remember-me">Remember for 30 days</Label>
                        </div>
                        <div className="mt-4 grid w-full items-center gap-1.5">
                            <Button className="bg-color-blue hover:bg-hover-color-blue" type="submit">Sign in</Button>
                        </div>
                        <div className="mt-6 flex w-full justify-center items-center gap-1.5 text-center text-xs" >
                            <Separator className="w-36 sm:w-40 md:w-48" />
                            <p className="text-xs"> OR </p>
                            <Separator className="w-36 sm:w-40 md:w-48" />
                        </div>
                        <div className="mt-6 grid w-full items-center">
                            <Button className="w-full h-10 gap-1.5" variant={"outline"}>
                                <img src={Logo} /> Sign in with Google
                            </Button>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-center gap-1.5">
                        <p>Don't have a account? </p>
                        <Link to={""}>
                            <a className="text-blue-500">Sign up!</a>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
            <div>

            </div>
        </div>
    )
}