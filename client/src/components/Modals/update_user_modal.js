import React, {useState} from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import toast from "react-hot-toast";
import {useAuth} from "../../context/auth";

function UpdateUserModal({uid}) {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [auth, setAuth] = useAuth();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //uppdate user
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const userData = new FormData();
            userData.append("name", name);
            userData.append("email", email);
            userData.append("password", password);
            userData.append("phone", phone);
            userData.append("address", address);
            userData.append("role", role);
            const {data} = axios.put(
                `${process.env.REACT_APP_API}/api/v1/auth/profile/${uid}`,
                userData
            );
            if (data?.success) {
                toast.error(data?.message);
            } else {
                toast.success("User Updated Successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    };


    return (
        <>
            <Button className="btn btn-primary my-2" onClick={handleShow}>
                Update user
            </Button>

            <Modal show={show} onHide={handleClose}>
                <div className="form-container" style={{marginTop: "-40px"}}>
                    <form onSubmit={handleUpdate} className="col-md-7">
                        <h4 className="title">USER PROFILE</h4>
                        <div className="mb-3">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Enter Your Name"
                                autoFocus
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Enter Your Email "
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Enter Your Password"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Enter Your Phone"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Enter Your Address"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            UPDATE
                        </button>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default UpdateUserModal
