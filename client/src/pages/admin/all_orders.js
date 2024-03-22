import React, {useState, useEffect} from "react";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import {useAuth} from "../../context/auth";
import moment from "moment";
import {Select} from "antd";
import Button from "react-bootstrap/Button";
import {toast} from "react-toastify";

const {Option} = Select;

const AllOrders = () => {
    const [status, setStatus] = useState([
        "Not Process",
        "Processing",
        "Shipped",
        "delivered",
        "cancel",
    ]);
    const [changeStatus, setChangeStatus] = useState("");
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();
    const getOrders = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`);
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    const handleChange = async (orderId, value) => {
        try {
            const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`, {
                status: value,
            });
            getOrders();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (orderId) => {
        try {
            const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/auth/deleteOrder/${orderId}`);
            getOrders();
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
                    <h1 className="text-center">All Orders</h1>
                    {orders?.map((o, i) => {
                        return (
                            <div className="border shadow">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Buyer</th>
                                        <th scope="col"> date</th>
                                        <th scope="col">Payment</th>
                                        <th scope="col">Quantity</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>
                                            <Select
                                                bordered={false}
                                                onChange={(value) => handleChange(o._id, value)}
                                                defaultValue={o?.status}
                                            >
                                                {status.map((s, i) => (
                                                    <Option key={i} value={s}>
                                                        {s}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </td>
                                        <td>{o?.buyer?.name}</td>
                                        <td>{moment(o?.createAt).fromNow()}</td>
                                        <td>{o?.payment.success ? "Online" : "Cash on Delivery"}</td>
                                        <td>{o?.products?.length}</td>
                                        <td>
                                            <Button variant="danger" onClick={() => handleDelete(o._id)}>Delete</Button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div className="container-fluid">
                                    {o?.products?.map((p, i) => (
                                        <div className="row mb-2 p-3 card flex-row" key={p._id}>
                                            <div className="col-md-4">
                                                <img
                                                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                                    className="card-img-top"
                                                    alt={p.name}
                                                    width="100px"
                                                    height={"100px"}
                                                />
                                            </div>
                                            <div className="col-md-8">
                                                <p>{p.name}</p>
                                                <p>{p.description.substring(0, 30)}</p>
                                                <p>Price : {p.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {/*<Button className="btn btn-danger" onClick={() => handleDelete(o._id)}>*/}
                                    {/*    Delete order*/}
                                    {/*</Button>*/}
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(o._id)}
                                    >
                                        Delete Order
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>

    );
};

export default AllOrders;
