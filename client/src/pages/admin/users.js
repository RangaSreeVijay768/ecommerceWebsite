import React, {useEffect, useState} from 'react'
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import AdminCreateUserForm from "../../components/Forms/admin_create_user_form";

function Users() {
    const [users, setUsers] = useState([]);

    //getall products
    const getAllUsers = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-users`);
            setUsers(data);
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };
    //lifecycle method
    useEffect(() => {
        getAllUsers();
    }, []);


    //delete category
    const handleDelete = async (id) => {
        try {
            const {data} = await axios.delete(
                `${process.env.REACT_APP_API}/api/v1/auth/delete/${id}`
            );
            if (data.success) {
                toast.success(`category is deleted`);

                getAllUsers();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };


    return (<Layout>
        <div className="row m-3 p-3">
            <div className="col-3">
                <AdminMenu/>
            </div>
            <div className="col-9">
                <div className="text-center d-flex justify-content-between">
                    <h1>All Users</h1>
                    <AdminCreateUserForm getAllUsers={getAllUsers()}/>
                </div>
                {users?.map((u, i) => {
                    return (
                        <div className="card border-4 mb-2 p-2">
                            <label className="fw-bold">Name : <span className="fw-normal">{u.name}</span></label>
                            <label className="fw-bold">Email : <span className="fw-normal"> {u.email}</span></label>
                            <label className="fw-bold">Password :<span
                                className="fw-normal"> {u.password}</span></label>
                            <label className="fw-bold">Contact :<span className="fw-normal"> {u.phone}</span></label>
                            <label className="fw-bold">Address :<span className="fw-normal"> {u.address}</span></label>
                            <label className="fw-bold">Answer :<span className="fw-normal"> {u.answer}</span></label>
                            <div className="d-flex justify-content-end">
                                <button
                                    className="btn btn-danger px-5"
                                    onClick={() => {
                                        handleDelete(u._id);
                                    }}
                                >
                                    Delete User
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </Layout>)
}

export default Users
