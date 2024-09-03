import { useNavigate } from "react-router-dom";

function ComeBack(){

    const navigate = useNavigate();
    
    return (
        <div>
            <p onClick={() => navigate('/home')} style={{cursor: 'pointer'}}>Come Back</p>
        </div>
    )
}

export default ComeBack;