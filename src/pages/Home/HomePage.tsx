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
              <div className='grid place-items-center xxs4:my-16 xxs2:my-16 xs:my-20 2xl:mb-28 xl:my-36 lg:my-32 sm:my-28'>
                <div className='text-center 2xl:text-start xxs4:mb-12 xxs3:mb-12 xl:mb-0'>
                  <div>
                    <h1 className="grid xs:flex xxs11:justify-center 2xl:block xxs4:text-5xl xxs3:text-[52px] xxs2:text-[56px] xxs:text-[60px] xs:text-4xl text-gray-900 tracking-tight 2xl:text-8xl xl:text-7xl md:text-6xl sm:text-5xl">
                      <span className="block">
                        Let's planning&nbsp;
                      </span>
                      <span className="block">
                        your trip!
                      </span>
                    </h1>
                  </div>
                  <div className='xxs4:w-[300px] xxs3:w-[310px] xxs2:w-[320px] xxs:w-[330px] xs:w-full xxs:flex xxs:justify-center xxs4:mt-5 xs:mt-1 sm:mt-3 2xl:mt-6'>
                    <p className='xxs4:text-sm xxs3:text-md xxs2:text-base xxs:text-lg xs:text-[12px] text-gray-900 tracking-tight 2xl:text-xl xl:text-lg md:text-md sm:text-sm'>
                      <span className='block'>Explore, organize, and embark on a unique adventure with ease. </span>             
                    </p>
                  </div>
                  <div className="grid xxs4:gap-y-4 xs:flex xxs4:mt-3 xs:mt-1 sm:mt-2 2xl:mt-4 gap-5 sm:justify-center 2xl:justify-start">
                  <Button size={"auto"}>
                      Place suggestions
                    </Button>
                    <Button size={"auto"} variant={"outline"}>
                      I know where to go
                    </Button>
                  </div>
                </div>
              </div>

              <div className='mb-24 2xl:mb-0'>
                <img 
                  src={Image} 
                  className="w-full h-auto" 
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="grid place-items-center w-full 2xl:mt-auto">
            <Credits/>
          </div>
        </div>
      </>
    )
}
