import { Link } from "react-router-dom";

export default function Credits(){
    return (
        <footer>
            <p className="text-xl text-gray-900 my-7">
                Created by <Link className="underline" to={"https://www.linkedin.com/in/joaopedrorosadepaula/"}>©João Pedro Rosa de Paula </Link>
            </p>
        </footer>
    )
}