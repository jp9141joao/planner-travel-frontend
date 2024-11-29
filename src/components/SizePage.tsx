import { useEffect, useState } from "react"

export default function SizePage(){
    const [w, setW] = useState<number>(window.innerWidth);
    const [h, setH] = useState<number>(window.innerHeight);

    useEffect(() => {
        setW(window.innerWidth);
        setH(window.innerHeight);
    }, [window.innerWidth, window.innerHeight])

    return (
        <p>width: {w} | height: {h}</p>
    )
}
{
    /*
        width: 1536 | height: 695
    */
}