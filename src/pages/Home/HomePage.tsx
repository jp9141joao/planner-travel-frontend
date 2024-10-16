import React from 'react';
import NavBar from "@/components/NavBar";
import Image from "@/assets/undraw_outdoor_adventure_re_j3b7.svg"
import { Button } from "@/components/ui/button";
import Credits from '@/components/Credits';

export default function HomePage(){
    return (
      <>
        <div className="flex flex-col min-h-screen">
          <div>
            <NavBar />
          </div>

          <div className="flex-grow grid place-items-center">
            <div className="grid grid-cols-1 2xl:grid-cols-2 2xl:mx-16">
              <div className='grid place-items-center my-20 2xl:mb-28 xl:my-36 lg:my-32 sm:my-28'>
                <div className='text-center 2xl:text-start md:mb-26 xl:mb-0'>
                  <div>
                    <h1 className="flex 2xl:block text-[36px] text-gray-900 tracking-tight 2xl:text-8xl xl:text-7xl md:text-6xl sm:text-5xl">
                      <span className="block">
                        Let's planning&nbsp;
                      </span>
                      <span className="block">
                        your trip!
                      </span>
                    </h1>
                  </div>
                  <div className='mt-1 sm:mt-3 2xl:mt-6'>
                    <p className='text-[12px] text-gray-900 tracking-tight 2xl:text-xl xl:text-lg md:text-md sm:text-sm'>
                      <span className='block'>Explore, organize, and embark on a unique adventure with ease. </span>             
                    </p>
                  </div>
                  <div className="flex mt-2 sm:mt-2 2xl:mt-4 gap-6 sm:justify-center 2xl:justify-start">
                    <Button size={"auto"}>
                      Place suggestions
                    </Button>
                    <Button size={"auto"} variant={"outline"}>
                      I know where to go
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <img 
                  src={Image} 
                  className="w-full h-auto" 
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="grid place-items-center w-full mt-14 mb-2 2xl:mt-auto sm:mt-20 2xl:mb-1">
            <Credits/>
          </div>
        </div>
      </>
    )
}
