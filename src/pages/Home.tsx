import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import Credits from '@/components/Credits';
import { BodyPage, BottomPage, MiddlePage, TopPage } from "@/components/LayoutPage/Layouts";
import Image from '../assets/undraw_travelers_re_y25a.svg';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "@/service/service";
import { setItemSessionStorage } from "@/components/utils/utils";

export default function Home() {

  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const userData = await getUser();

      if (!userData) {
        localStorage.removeItem('user')
        throw new Error('User data could not be retrieved from the token. Please try again.');
      }

      setItemSessionStorage('user', userData.data);
    } catch (error: any) {
      console.error(error);
      localStorage.removeItem('authToken');
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      loadData(); 
    }
  }, []);

  return (
    <BodyPage>
        <TopPage>
            <NavBar/>
        </TopPage>
        <MiddlePage>
            <div className='text-center xs:text-start lg:place-items-start mx-[8.8vw] lg:mx-0 mt-[6vw] xs:mt-[14vw] lg:mt-0 lg:mb-[4vw]'>
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
                  <Button size={"auto"} onClick={() => navigate('/viewTrips')}>
                    View My Trips
                  </Button>
                  <Button size={"auto"} variant={"outline"} onClick={() => navigate('/addTrips')}>
                    Add New Trip
                  </Button>
                </div>
            </div>
            <div className="mx-[8.8vw] mt-[6vw] xs:mx-[15.5vw] xs:my-[7vw] lg:my-0 lg:mt-[1vw] lg:mx-[2vw]">
              <img
                src={Image}
                className="w-full h-auto"
              />
            </div>
        </MiddlePage>
        <BottomPage>
          <Credits/>
        </BottomPage>
    </BodyPage>
  )
}
