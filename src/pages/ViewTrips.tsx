import Credits from "@/components/Credits";
import { GoBack } from "@/components/GoBack";
import { BodyPage, BottomPage, MiddlePage, TopPage } from "@/components/LayoutPage/Layouts";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "react-day-picker";
import { Link } from "react-router-dom";
import Image from "../assets/undraw_eiffel-tower_ju2s.svg"

export function ViewTrips() {
    return (
        <BodyPage>
            <TopPage>
                <GoBack to="home"/>
            </TopPage>
            <MiddlePage>
                <div className="mx-[8.8vw] mt-[6vw] xs:mx-[15.5vw] xs:my-[7vw] lg:my-0 lg:mt-[1vw] lg:mx-[8vw]">
                  <img
                    src={Image}
                    className="w-auto h-auto"
                  />
                </div>
                <div className='text-center  mx-[8.8vw] lg:mx-0 mt-[6vw] xs:mt-[14vw] lg:mt-0 lg:mb-[3vw]'>
                  <div>
                      <h1 className="grid text-center text-[14vw] xxs5:text-[13.7vw] xs:text-[10.5vw] lg:text-[7vw] w-full text-gray-900 tracking-tight leading-[1]">
                          Your Trips!
                      </h1>
                  </div>
                  <div>
                      <p className='text-center text-[5.2vw] xxs8:text-[4.4vw] xs:text-[3.0vw] lg:text-[1.8vw] mt-[4.5vw] xxs5:mt-[4.2vw] xs:mt-[2.8vw] lg:mt-[1vw] leading-tight text-gray-900 tracking-tight'>
                        All your journeys in one place.
                      </p>
                  </div>
              </div>
            </MiddlePage>
            <BottomPage>
                <Credits/>
            </BottomPage>
        </BodyPage>          
    )
}