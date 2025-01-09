import Credits from "@/components/Credits";
import { GoBack } from "@/components/GoBack";
import { BodyPage, BottomPage, MiddlePageOneCol, TopPage } from "@/components/LayoutPage/Layouts";
import Image from '../assets/undraw_page-not-found_6wni.svg';

export function NotFOund() {

    return (
        <BodyPage>
            <TopPage>
                <GoBack to="home" />            
            </TopPage>
            <MiddlePageOneCol>
                <div className="grid place-items-center">
                    <div>
                        <h1 className="grid text-[12.1vw]  xxs8:text-[12.7vw] xs:text-[8.8vw] lg:text-[4vw] mt-[16vw] lg:mt-[3vw] w-full text-gray-900 tracking-tight leading-[0.6] xxs3:leading-[0.7]">
                            Page Not Found!
                        </h1> 
                    </div>
                    <div>
                        <p className="text-center text-[5.3vw] xxs8:text-[5.9vw] xs:text-[4vw] lg:text-[2vw] mt-[7vw] xxs5:mt-[6.5vw] xs:mt-[5vw] lg:mt-[1.6vw] px-[6vw] lg:px-[17vw] leading-tight text-gray-900 tracking-tight">
                            Oops! The page you’re looking for doesn’t exist. It might have been moved or deleted.
                        </p>
                    </div>
                    <div>
                        <img 
                            src={Image}
                            className="w-full h-auto px-[7vw] xxs5:px-[9vw] xs:px-[15.7vw] lg:px-[32vw] mt-[16vw] mb-[3vw] lg:mt-[3vw]"
                        />
                    </div>
                </div>
                
            </MiddlePageOneCol>
            <BottomPage>
                <Credits />
            </BottomPage>
        </BodyPage>
    )
}