import React from 'react';
import NavBar from "@/components/NavBar";
import Image from "@/assets/undraw_outdoor_adventure_re_j3b7.svg"
import { Button } from "@/components/ui/button";
import Credits from '@/components/Credits';

export default function HomePage(){
    return (
      <>
        <div>
          <NavBar />
        </div>
        <div className="grid place-items-center h-screen">
          <div className="grid grid-cols-1 2xl:grid-cols-2 2xl:mx-16">
            <div className='grid place-items-center 2xl:mb-28 xl:my-20 lg:my-'>
              <div className='text-center 2xl:text-start'>
                <div>
                  <h1 className="flex 2xl:block text-gray-900 tracking-tight 2xl:text-8xl xl:text-7xl lg:text-6xl">
                    <span className="block">Let's planning&nbsp;</span>
                    <span className="block">your trip!</span>
                  </h1>
                </div>
                <div className='mt-6'>
                  <p className='text-gray-900 tracking-tight 2xl:text-xl xl:text-lg lg:text-md'>
                    <span className='block'>Explore, organize, and embark on a unique adventure with ease. </span>             
                  </p>
                </div>
                <div className="flex mt-4 gap-6 sm:justify-center 2xl:justify-start">
                  <Button size={'xl1'}>Place suggestions</Button>
                  <Button variant={"outline"} size={'xl1'}>I know where to go</Button>
                </div>
              </div>
            </div>
            <div className=''>
              <img 
                src={Image} 
                className="w-full h-auto" 
              />
            </div>
          </div>
          <div>
            <Credits/>
          </div>
        </div>
      </>
    )
}