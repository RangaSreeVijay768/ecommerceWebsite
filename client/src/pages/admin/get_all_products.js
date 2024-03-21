import React, {useState, useEffect} from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import {Link, useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import UpdateProduct from "./update_product";

function Products() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    //getall products
    const getAllProducts = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/products`);
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Someething Went Wrong");
        }
    };

    const handleDelete = async (id) => {
        try {
            let answer = window.prompt("Are You Sure want to delete this product ? ");
            if (!answer) return;
            const { data } = await axios.delete(
                `${process.env.REACT_APP_API}/api/v1/product/delete/${id}`
            );
            toast.success("Product DEleted Succfully");
            navigate(`/dashboard/admin/products`);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };



    //lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);
    return (<Layout>
            <div className="row mt-100px m-3 p-3">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9 mt-4">
                    <h1 className="text-center">All Products List</h1>
                    <div className="d-flex flex-wrap">
                        {products?.map((p) => (<Link
                            key={p._id}
                            to={`/dashboard/admin/product/${p.slug}`}
                            className="product-link"                            >~
                                <div className="card m-2" style={{width: "18rem"}}>
                                    <img
                                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                        className="img-fill p-2 rounded-2 h-50px"
                                        alt={p.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                    </div>
                                </div>
                            </Link>))}
                    </div>
                </div>
            </div>
        </Layout>


    );
};

export default Products;
