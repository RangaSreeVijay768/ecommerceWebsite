// OrderDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import {useNavigate, useParams} from "react-router-dom";

const OrderDetails = () => {
    const [order, setOrder] = useState(null);
    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        if (params?.id) getOrderDetails();
    }, [params?.id]);

    const getOrderDetails = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/order/${params.id}`);
            setOrder(data);
        } catch (error) {
            console.log(error);
        }
    };
    const orderId = params.id;
    const calculateTotalAmount = (products) => {
        if (!products || !Array.isArray(products)) {
            return 0; // Return 0 if products is undefined or not an array
        }
        let totalAmount = 0;
        products.forEach(product => {
            totalAmount += product.price;
        });
        return totalAmount;
    };

    return (
        <Layout title="Order Details">
            <div className="row mt-100px ms-auto justify-content-center">
                <label className="fs-5">orderId: <span
                    className="fw-bold"> A - {orderId.slice(-4)}</span></label>
                <label className="fs-5">no. of products: <span
                    className="fw-bold">{order?.products?.length}</span></label>
                <label className="fs-5">{order?.payment.success ? "Total amount paid" : "Total amount to be paid"}<span
                    className="fw-bold"> ₹ {calculateTotalAmount(order?.products)}</span></label>
                <div>Payment Type: <span
                    className="fw-bold">{order?.payment.success ? "Online" : "Cash on Delivery"}</span></div>
                <div>All products you have ordered</div>
                <div className="col-md-10 d-flex flex-wrap">
                    {order?.products?.map((p) => (
                        <div className="card m-2" key={p._id}>
                            <img
                                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                className="img-fill p-2 rounded-2 h-50px"
                                alt={p.name}
                            />
                            <div className="card-body">
                                <div className="card-name-price">
                                    <h5 className="card-title">{p.name}</h5>
                                    <h5 className="card-title card-price">
                                        {p.price.toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                        })}
                                    </h5>
                                </div>
                                <p className="card-text ">
                                    {p.description.substring(0, 60)}...
                                </p>
                                <div className="card-name-price">
                                    <button
                                        className="btn btn-info ms-1"
                                        onClick={() => navigate(`/product/${p.slug}`)}
                                    >
                                        More Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default OrderDetails;
