import React, {useEffect, useState} from 'react'
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import AdminCreateUserForm from "../../components/Forms/admin_create_user_form";
import {useAuth} from "../../context/auth";
import UpdateUserModal from "../../components/Modals/update_user_modal";
import {Modal} from "antd";
import CategoryForm from "../../components/Forms/category_forms";
import UpdateUserForm from "../../components/Forms/admin_update_user_form";

function Users() {
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedRole, setUpdatedRole] = useState("");

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

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `${process.env.REACT_APP_API}/api/v1/auth/update/${selected._id}`,
                { role: updatedRole }
            );
            if (data?.success) {
                toast.success(`${updatedRole} is updated`);
                setSelected(null);
                setUpdatedRole("");
                setVisible(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <Layout>
        <div className="row mt-100px m-3 p-3">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
                <div className="text-center d-flex justify-content-between">
                    <h1>All Users</h1>
                    <AdminCreateUserForm/>
                </div>
                {users?.map((u, i) => {
                    return (
                        <div className="card border-4 mb-2 p-2">
                            <label className="fw-bold">Name : <span className="fw-normal">{u._id}</span></label>
                            <label className="fw-bold">Email : <span className="fw-normal"> {u.email}</span></label>
                            <label className="fw-bold">Password :<span
                                className="fw-normal"> {u.passwordAgain}</span></label>
                            <label className="fw-bold">Contact :<span className="fw-normal"> {u.phone}</span></label>
                            <label className="fw-bold">Address :<span className="fw-normal"> {u.address}</span></label>
                            <label className="fw-bold">Answer :<span className="fw-normal"> {u.answer}</span></label>
                            <label className="fw-bold">Role :<span className="fw-normal"> {u.role}</span></label>
                            <div className="d-flex justify-content-end">
                                <button
                                    className="btn btn-primary px-5 me-4"
                                    onClick={() => {
                                        setVisible(true);
                                        setUpdatedRole(u.role);
                                        setSelected(u);
                                    }}
                                >
                                    Edit role
                                </button>

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
                <Modal
                    onCancel={() => setVisible(false)}
                    footer={null}
                    visible={visible}
                >
                    <UpdateUserForm
                        value={updatedRole}
                        setValue={setUpdatedRole}
                        handleSubmit={handleUpdate}
                    />
                </Modal>

            </div>
        </div>
        </Layout>)
}

export default Users
