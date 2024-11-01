import NavBar from "@/components/NavBar";
import Image from "@/assets/undraw_outdoor_adventure_re_j3b7.svg"
import { Button } from "@/components/ui/button";
import Credits from '@/components/Credits';

export default function Home() {
  return (
    <>
      <div className="">
        <div>
          <NavBar />
        </div>

        <div className="flex min-h-screen flex-col">
          <div className="grid grid-cols-1 flex-grow">
            <div className='grid place-items-center xxs11:my-[9vh] xs:my-[12vh] xl:my-[9vw] 2xl:my-[9vw]'> {/*2xl:my-[13vw]*/}
              <div className='text-center'>
                <div>
                  <h1 className="flex xxs11:text-[26px] xxs10:text-[28px] xxs9:text-3xl xxs8:text-[32px] xxs7:text-4xl xxs6:text-[40px] xxs5:text-[44px] xxs4:text-5xl xxs3:text-[52px] xxs2:text-[56px] xxs:text-[60px] xs:text-4xl text-gray-900 tracking-tight 2xl:text-8xl 3xl:text-9xl xl:text-7xl md:text-6xl sm:text-5xl grid leading-tight xs:flex xxs11:justify-center">
                    <span className="block">
                      Let's planning&nbsp;
                    </span>
                    <span className="block">
                      your trip!
                    </span>
                  </h1>
                </div>
                <div className='xxs11:w-[200px] xxs10:w-[220px] xxs9:w-[240px] xxs8:w-[250px] xxs7:w-[270px] xxs6:w-[280px] xxs5:w-[290px] xxs4:w-[300px] xxs3:w-[310px] xxs2:w-[320px] xxs:w-[330px] xs:w-full xxs:flex xxs:justify-center xxs10:mt-2 xxs8:mt-4 xxs5:mt-5 xs:mt-1 sm:mt-3 2xl:mt-6'>
                  <p className='xxs11:text-sm xxs6:text-sm xxs3:text-md xxs2:text-base xxs:text-lg xs:text-[12px] leading-tight text-gray-900 tracking-tight 3xl:text-3xl 2xl:text-2xl xl:text-lg md:text-md sm:text-sm'>
                    <span className='block'>
                      Explore, organize, and embark on a unique adventure with ease.
                    </span>             
                  </p>
                </div>
                <div className="grid xxs11:gap-y-2 xxs9:gap-y-3 xxs7:gap-y-4 xs:flex xxs11:mt-3 xs:mt-1 sm:mt-2 2xl:mt-4 gap-5 sm:justify-center">
                  <Button size={"auto"} className="hover:-translate-y-1 transition-all">
                    Place suggestions
                  </Button>
                  <Button size={"auto"} className="hover:-translate-y-1 transition-all" variant={"outline"}>
                    I know where to go
                  </Button>
                </div>
              </div>
            </div>

            <div className="w-full h-[60vw] ">
              <img 
                src={Image} 
                className="w-full h-full" 
                style={{ objectFit: "contain" }} 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full text-center flex-shrink-0"> 
        <Credits />
      </div>
    </>
  )
}
