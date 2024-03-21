import React, {useState} from 'react'
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import {toast} from "react-toastify";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/auth";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();


    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,
                { email, password}
            );
            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || '/');
            } else {
                toast.error(res.data.message);
            }
        } catch (error){
            console.log(error);
            toast.error("something went wrong")
        }
    }

    return (
        <Layout>
            <div className="form-container">

                <form onSubmit={handleLoginSubmit}>
                    <h2 className="mb-3">Login form</h2>
                    <div className="mb-3 form-group">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" value={email} required
                               onChange={(e) => setEmail(e.target.value)}
                               className="form-control" id="exampleInputEmail1"
                               placeholder="Enter email"/>
                    </div>
                    <div className="mb-3 form-group">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" value={password} required
                               onChange={(e) => setPassword(e.target.value)}
                               className="form-control" id="exampleInputPassword1"
                               placeholder="Password"/>
                    </div>

                    <div className="mb-3">
                        <label onClick={() => {navigate("/forgot-password")}} className="p-0 bg-transparent" style={{display: "flex", justifyContent: "end", cursor: "pointer"}}>forgot password?</label>
                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                </form>

            </div>
        </Layout>
    )
}

export default Login
