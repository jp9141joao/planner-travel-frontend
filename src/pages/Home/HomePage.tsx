import NavBar from "@/components/NavBar";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import Image from "@/assets/undraw_Outdoor_adventure_re_j3b7.png"

export default function HomePage(){
    return (
        <div>
          <NavBar />
          <div className="relative isolate mt-48 justify-center px-6 pt-14 lg:px-8">
            <div className="text-center">
              <h1 className="text-balance text-4x tracking-tight text-gray-900 sm:text-6xl">
                Let's planning your travel
              </h1>
            </div>
            <div>
             
            </div>
          </div>
        </div>
    )
}