import NavBar from "@/components/NavBar";
import Image from "@/assets/undraw_Outdoor_adventure_re_j3b7-removebg-preview.png"
import { Button } from "@/components/ui/button";

export default function HomePage(){
    return (
      <>
          <NavBar />
          {
            /*
            <div className="relative isolate mt-20 justify-center px-6 pt-14 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="flex flex-col justify-center items-start">
                <div className="ml-48">
                  <h1 className="text-start text-4xl tracking-tight text-gray-900 sm:text-6xl mb-4">
                    <span className="block">Let's planning</span>
                    <span className="block">your travel</span>
                  </h1>
                  <div className="flex gap-3">
                    <Button>Place suggestions</Button>
                    <Button variant={"outline"}>I know where to go</Button>
                  </div>
                </div>
              </div>
              <div>
                <img src={Image}/>
              </div>
            </div>
          </div>
            */
          }
      </>
    )
}