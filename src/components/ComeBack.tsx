import { useNavigate } from "react-router-dom";

function ComeBack({ url }: {url: string}){

    const navigate = useNavigate();
    
    return (
        <div >
            <p onClick={() => navigate(url)} style={{cursor: 'pointer'}}>Come Back</p>
        </div>
    )
}

export default ComeBack;