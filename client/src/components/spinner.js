import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from "react-router-dom";

function Spinner() {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);
        count === 0 && navigate('/login', {
            state: location.pathname
        });
        return () => clearInterval(interval)
    }, [count, navigate, location]);


    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{height: "100vh"}}>
                <h3 className="Text-center">redirecting you in {count}</h3>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}

export default Spinner
