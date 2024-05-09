import React, {useState, useEffect} from "react";
import Layout from "./../components/Layout/Layout";
import {useCart} from "../context/cart";
import {useAuth} from "../context/auth";
import {useNavigate} from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import {AiFillWarning} from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/cart_styles.css";
import AdminMenu from "../components/Layout/AdminMenu";

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("Braintree"); // Default payment method
    const navigate = useNavigate();

    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price;
            });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
            });
        } catch (error) {
            console.log(error);
        }
    };
    //detele item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    //get payment gateway token
    const getToken = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
            console.log(`client token is ${data.clientToken}`);
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getToken();
    }, [auth?.token]);

    //handle payments
    const handlePayment = async () => {
        try {
            setLoading(true);
            if (paymentMethod === "Braintree") {
                const { nonce } = await instance.requestPaymentMethod();
                await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
                    nonce,
                    cart,
                });
            } else if (paymentMethod === "COD") {
                await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
                    cart,
                });
            }
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully ");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (

        <Layout>
            <div className="row mt-85px m-1">
                <div className="row mx-0 px-0">
                    <div className="col-md-12 px-0">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {!auth?.user
                                ? "Hello Guest"
                                : `Hello  ${auth?.token && auth?.user?.name}`}
                            <p className="text-center">
                                {cart?.length
                                    ? `You Have ${cart.length} items in your cart ${
                                        auth?.token ? "" : "please login to checkout !"
                                    }`
                                    : " Your Cart Is Empty"}
                            </p>
                        </h1>
                    </div>
                </div>
                <div className="row ms-1 me-3 justify-content-center container-fluid">
                    <div className="col-md-4 ps-0 pe-3 mt-2">
                        {cart?.map((p) => (
                            <div className="row border border-2 border-primary rounded-2 p-4 mb-1" key={p._id}>
                                <div className="col-md-4">
                                    <img
                                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                        width="100%"
                                        height={"130px"}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <p>{p.name}</p>
                                    <p>{p.description.substring(0, 30)}</p>
                                    <p>Price : ₹ {p.price}</p>
                                </div>
                                <div className="col-md-4 cart-remove-btn">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => removeCartItem(p._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-4 flex-column align-items-center
                     border border-2 border-primary rounded-2 px-0 me-3 d-flex cart-summary my-2">
                        <div className="border-2 border-bottom border-primary w-100 text-center px-0">
                            <h2>Cart Summary</h2>
                            <p className="">Total | Checkout | Payment</p>
                        </div>
                        <hr/>
                        <h4>Total : {totalPrice()} </h4>
                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => navigate("/dashboard/user/profile")}
                                    >
                                        Update Address
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                                {auth?.token ? (
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => navigate("/dashboard/user/profile")}
                                    >
                                        Update Address
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() =>
                                            navigate("/login", {
                                                state: "/cart",
                                            })
                                        }
                                    >
                                        Plase Login to checkout
                                    </button>
                                )}
                            </div>
                        )}
                        <div className="mt-2 p-3">
                            <div className="mb-3">
                                <label>Select Payment Method:</label>
                                <select
                                    className="form-select"
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                >
                                    <option value="Braintree">Online Payment</option>
                                    <option value="COD">Cash on Delivery</option>
                                </select>
                            </div>
                            {paymentMethod === "Braintree"
                                ? (<div>
                                    {!clientToken || !auth?.token || !cart?.length ? (
                                        ""
                                    ) : (
                                        <>
                                            <DropIn
                                                options={{
                                                    authorization: clientToken,
                                                    paypal: {
                                                        flow: "vault",
                                                    },
                                                }}
                                                onInstance={(instance) => setInstance(instance)}
                                            />

                                            <button
                                                className="btn btn-primary"
                                                onClick={handlePayment}
                                                disabled={loading || !instance || !auth?.user?.address}
                                            >
                                                {loading ? "Processing ...." : "Make Payment"}
                                            </button>
                                        </>
                                    )}
                                </div>)
                                : (<div>
                                    <button
                                        className="btn btn-success mt-2"
                                        onClick={handlePayment}
                                        disabled={loading || !auth?.user?.address}
                                    >
                                        {loading ? "Processing ...." : "Proceed"}
                                    </button>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>


        // <Layout>
        //     <div className=" cart-page">
        //     </div>
        // </Layout>
    )
        ;
};

export default CartPage;
