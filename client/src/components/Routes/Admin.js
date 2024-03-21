import {useEffect, useState} from "react";
import {useAuth} from "../../context/auth";
import {Outlet, useNavigate} from "react-router-dom";
import axios from "axios";
import Spinner from "../spinner";

export default function AdminRoutes(){
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        const authCheck = async() => {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin`)
            if(res.data.ok){
                setOk(true)
            }else {
                setOk(false)
            }
        }
        if(auth?.token) authCheck();
        if(auth?.user?.role === 0){
            navigate('/')
        }
    }, [auth?.token]);

    return ok ? <Outlet/>: <Spinner/>
}
