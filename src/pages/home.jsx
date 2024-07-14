import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
let Home = () => {
    let navigate = useNavigate()
    useEffect(() => {
        const checkSign = localStorage.getItem("Sign");
        if (!checkSign) {
            navigate("/");
        }
    }, [navigate]);
    return (
        <>
            <h1>Home Page</h1>
        </>
    )
};
export default Home;