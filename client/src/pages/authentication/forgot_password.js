import React, {useState} from 'react'
import Layout from "../../components/Layout/Layout";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [answer, setAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const navigate = useNavigate();


    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
                { email, answer, newPassword}
            );
            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                navigate('/');
            } else {
                toast.error(res.data.message);
            }
        } catch (error){
            console.log(error);
            toast.error("something went wrong")
        }
    }

    return (
        <Layout title={"Forgot Password - Ecommerce app"}>
            <div className="form-container">

                <form onSubmit={handleForgotPasswordSubmit}>
                    <h2 className="mb-3">Reset Password</h2>
                    <div className="mb-3 form-group">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" value={email} required
                               onChange={(e) => setEmail(e.target.value)}
                               className="form-control" id="exampleInputEmail1"
                               placeholder="Enter email"/>
                    </div>
                    <div className="mb-3 form-group">
                        <label htmlFor="exampleInputQuestion1" className="form-label">Question</label><br/>
                        <label htmlFor="exampleInputQuestion1">what is your favourite food?</label>
                        <input type="text" value={answer} required
                               onChange={(e) => setAnswer(e.target.value)}
                               className="form-control" id="exampleInputQuestion1"
                               placeholder="Enter your answer"/>
                    </div>
                    <div className="mb-3 form-group">
                        <label htmlFor="exampleInputNewPassword1" className="form-label">Password</label>
                        <input type="password" value={newPassword} required
                               onChange={(e) => setNewPassword(e.target.value)}
                               className="form-control" id="exampleInputNewPassword1"
                               placeholder="Password"/>
                    </div>


                    <button type="submit" className="btn btn-primary">Reset</button>
                </form>

            </div>
        </Layout>
    )
}

export default ForgotPassword
