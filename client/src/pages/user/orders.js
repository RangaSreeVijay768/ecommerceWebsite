import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import {Link} from "react-router-dom";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();
    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`);
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };
    const orderId = async (orderId) => {
        orderId.slice(-4);
    }

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);
    return (
        <Layout title={"Your Orders"}>
            <div className="container-flui p-3 m-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-6 mt-4">
                        <h1 className="text-center">All Orders</h1>
                        {orders?.length === 0 ? <div className="text-center mt-100px">you haven't create any orders yet</div>: <div></div>}
                        {orders?.map((o) => (
                            <Link
                            key={o._id}
                            to={`/dashboard/user/orders/${o._id}`}
                            className="product-link">
                            <div className="mb-4 shadow">
                                <div className="border border-2 border-primary rounded-2">
                                    <div className="row mx-0 border-bottom border-primary justify-content-center">
                                        <div
                                            className="d-flex flex-column align-items-center">
                                            <label className="fs-5">orderId: <span
                                                className="fw-bold"> A - {o._id.slice(-4)}</span></label>
                                            <label>(click to view details)</label>
                                        </div>
                                    </div>
                                    <label className="ms-2">products in this order</label>
                                    <div className="p-3">
                                        {o?.products?.map((p, i) => (
                                            <div className="row flex-row" key={p._id}>
                                                <div className="col-md-8">
                                                    <label className="fw-bolder fs-4"> {p.name}<span
                                                        className="fw-normal"> => ( ₹ {p.price})</span></label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>))}

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Orders;
