import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import {toast} from "react-toastify";

function AdminCreateUserForm({getAllUsers}) {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [answer, setAnswer] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,
                {name, email, password, phone, address, answer}
            );
            if (res.data.success) {
                toast.success(res.data.message);
                handleClose();
                getAllUsers();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <Button className="btn btn-primary my-2" onClick={handleShow}>
                Create User
            </Button>

            <Modal show={show} onHide={handleClose}>
                <div className="p-4">
                    <form onSubmit={handleRegisterSubmit} className="">
                        <h2 className="mb-3">Create a new user</h2>
                        <div className="mb-3 form-group">
                            <label htmlFor="exampleInputName1" className="form-label">Name</label>
                            <input type="text"
                                   value={name} required
                                   onChange={(e) => setName(e.target.value)}
                                   className="form-control"
                                   id="exampleInputName1"
                                   placeholder="Enter your name"/>
                        </div>
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
                        <div className="mb-3 form-group">
                            <label htmlFor="exampleInputPhone1" className="form-label">Mobile number</label>
                            <input type="number" value={phone} required
                                   onChange={(e) => setPhone(e.target.value)}
                                   className="form-control" id="exampleInputPhone11"
                                   placeholder="Enter mobile number"/>
                        </div>
                        <div className="mb-3 form-group">
                            <label htmlFor="exampleInputAddress1" className="form-label">Address</label>
                            <input type="text" value={address} required
                                   onChange={(e) => setAddress(e.target.value)}
                                   className="form-control" id="exampleInputAddress1"
                                   placeholder="Enter address"/>
                        </div>
                        <div className="mb-3 form-group">
                            <label htmlFor="exampleInputQuestion1" className="form-label">Question</label><br/>
                            <label htmlFor="exampleInputQuestion1">what is your favourite food?</label>
                            <input type="text" value={answer} required
                                   onChange={(e) => setAnswer(e.target.value)}
                                   className="form-control" id="exampleInputAddress1"
                                   placeholder="Enter the answer"/>
                        </div>

                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            </Modal>
        </>
    );
}

export default AdminCreateUserForm;
