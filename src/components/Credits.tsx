import { Link } from "react-router-dom";

export default function Credits(){
    return (
        <footer>
            <p className="text-[4vw] xs:text-[3.0vw] lg:text-[1.3vw] mt-[1.5vw] mb-[0.75vw] xxs3:mt-[3vw] xxs3:mb-[1.5vw] lg:mt-[1vw] lg:mb-[0.5vw]" >
                Created by <a className="underline" href={"https://www.linkedin.com/in/joaopedrorosadepaula/"} target="_blank" rel="noopener noreferrer">
                    ©João Pedro R. de Paula
                </a>
            </p>
        </footer>
    )
}