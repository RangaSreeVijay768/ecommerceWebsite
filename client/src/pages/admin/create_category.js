import React, {useEffect, useState} from 'react'
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import {toast} from "react-toastify";
import CategoryForm from "../../components/Forms/category_forms";
import { Modal } from "antd";

function CreateCategory() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create`, {
                name,
            });
            if (data?.success) {
                toast.success(`${name} is created`);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            // toast.error("somthing went wrong in input form");
        };
    };

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/categories`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something wwent wrong in getting catgeory");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    //update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `${process.env.REACT_APP_API}/api/v1/category/update/${selected._id}`,
                { name: updatedName }
            );
            if (data?.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    //delete category
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(
                `${process.env.REACT_APP_API}/api/v1/category/delete/${pId}`
            );
            if (data.success) {
                toast.success(`category is deleted`);

                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };


    return (
        <Layout>
            <div className="row mt-100px m-3 p-3">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9 mt-4">
                    <h1>Manage Category</h1>
                    <div className="p-3">
                        <CategoryForm
                            handleSubmit={handleSubmit}
                            value={name}
                            setValue={setName}

                        />
                    </div>
                    <div className="">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {categories?.map((c) => (
                                <>
                                    <tr>
                                        <td key={c._id}>{c.name}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary ms-2"
                                                onClick={() => {
                                                    setVisible(true);
                                                    setUpdatedName(c.name);
                                                    setSelected(c);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger ms-2"
                                                onClick={() => {
                                                    handleDelete(c._id);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <Modal
                        onCancel={() => setVisible(false)}
                        footer={null}
                        visible={visible}
                    >
                        <CategoryForm
                            value={updatedName}
                            setValue={setUpdatedName}
                            handleSubmit={handleUpdate}
                        />
                    </Modal>
                </div>
            </div>
        </Layout>

    )
}

export default CreateCategory
