import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/product_details.css";
import toast from "react-hot-toast";
import {useCart} from "../context/cart";

const ProductDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);

    //initalp details
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);
    //getProduct
    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/product/${params.slug}`
            );
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };
    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
            );
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout>
            <div className="row container product-details">
                <div className="col-md-6">
                    <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                        height="300"
                        width={"350px"}
                    />
                </div>
                <div className="col-md-6 product-details-info">
                    <h1 className="text-center">Product Details</h1>
                    <hr />
                    <h6>Name : {product.name}</h6>
                    <h6>Description :<span className="fs-10 fw-normal"> {product.description}</span></h6>
                    <h6>
                        Price : {product?.price?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "INR",
                        })}
                    </h6>
                    <h6>Category : {product?.category?.name}</h6>
                    <button class="btn btn-secondary ms-1"
                            onClick={() => {
                                const isInCart = cart.some(item => item._id === product._id); // Check if product is already in cart
                                if (isInCart) {
                                    navigate('/cart'); // Redirect to cart page if product is already in cart
                                } else {
                                    setCart([...cart, product]);
                                    localStorage.setItem(
                                        "cart",
                                        JSON.stringify([...cart, product])
                                    );
                                    toast.success("Item Added to cart");
                                }
                            }}
                    >
                        {cart.some(item => item._id === product._id) ? "GO TO CART" : "ADD TO CART"}
                    </button>
                </div>
            </div>
            <hr />
            <div className="row container similar-products">
                <h4>Similar Products ➡️</h4>
                {relatedProducts.length < 1 && (
                    <p className="text-center">No Similar Products found</p>
                )}
                <div className="d-flex flex-wrap">
                    {relatedProducts?.map((p) => (
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
                                            currency: "INR",
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
                                    {/* <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetails;
