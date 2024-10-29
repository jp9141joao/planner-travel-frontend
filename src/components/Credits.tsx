import { Link } from "react-router-dom";

export default function Credits(){
    return (
        <footer>
            <p className=" mt-auto mb-2 xxs11:text-[12px] xxs5:text-sm xs:text-[12px] sm:text-sm md:text-md xl:text-lg 2xl:text-xl">
                Created by <Link className="underline" to={"https://www.linkedin.com/in/joaopedrorosadepaula/"}>©João Pedro Rosa de Paula </Link>
            </p>
        </footer>
    )
}