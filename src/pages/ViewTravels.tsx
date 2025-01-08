import Credits from "@/components/Credits";
import { GoBack } from "@/components/GoBack";
import { BodyPage, BottomPage, MiddlePage, TopPage } from "@/components/LayoutPage/Layouts";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "react-day-picker";
import { Link } from "react-router-dom";

export function Travels() {
    return (
        <>
        {/*
        <BodyPage>
            <TopPage>
                <GoBack to="home"/>
            </TopPage>
            <MiddlePage>
                <div className="hidden lg:block mx-[2vw]">
                    <img
                        src={Image}
                        className="w-auto h-auto"
                    />
                </div>
                <div className='text-center xs:text-start lg:place-items-start mx-[8.8vw] lg:mx-0 mt-[6vw] xs:mt-[14vw] lg:mt-0 lg:mb-[3vw]'>
                <div>
                    <h1 className="grid text-[14vw] xxs5:text-[13.7vw] xs:text-[10.5vw] lg:text-[7vw] w-full text-gray-900 tracking-tight leading-[1]">
                        Let's planning your trip!
                    </h1>
                </div>
                <div>
                    <p className='xs:text-start text-[5.2vw] xxs8:text-[4.4vw] xs:text-[3.0vw] lg:text-[1.8vw] mt-[4.5vw] xxs5:mt-[4.2vw] xs:mt-[2.8vw] lg:mt-[1.9vw] leading-tight text-gray-900 tracking-tight'>
                      Explore, organize, and embark on a unique adventure with ease.
                    </p>
                </div>
                <div className="grid xs:flex xs:justify-start xxs11:gap-y-3 xs:gap-y-0 xs:gap-4 mt-[3vw] xs:mt-[1.4vw] lg:mt-[0.8vw]">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size={"auto"}>Place suggestions</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-full max-h-screen overflow-auto p-4">
                      <DialogHeader>
                        <DialogTitle>Place Suggestions</DialogTitle>
                        <DialogDescription>
                          Find places to add to your travel plan and make the most of your trip.
                        </DialogDescription>
                      </DialogHeader>
                        <PlaceSuggestions />
                    </DialogContent>
                  </Dialog>
                  <Button size={"auto"} variant={"outline"}>
                    I know where to go
                  </Button>
                </div>
            </div>
            </MiddlePage>
            <BottomPage>
                <Credits/>
            </BottomPage>
        </BodyPage>  
        */}
        <p>ds</p>
        </>
        
    )
}