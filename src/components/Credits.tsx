import { Link } from "react-router-dom";

export default function Credits(){
    return (
        <footer>
            <p className="text-[4vw] xs:text-[3.0vw] lg:text-[1.3vw] pt-[3vw] mb-[1.5vw] lg:mt-[1vw] lg:mb-[0.5vw]" >
                Created by <Link className="underline" to={"https://www.linkedin.com/in/joaopedrorosadepaula/"}>©João Pedro R. de Paula</Link>
            </p>
        </footer>
    )
}