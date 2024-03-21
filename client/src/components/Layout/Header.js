import React from "react";
import {NavLink, Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/auth";
import {toast} from "react-hot-toast";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {Avatar} from "@mui/material";
import SearchInput from "../Forms/search";
import useCategory from "../../hooks/use_category";
import {Badge} from "antd";
import {useCart} from "../../context/cart";


const Header = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const categories = useCategory();
    const [cart] = useCart();
    const handleLogout = () => {
        setAuth({...auth, user: null, token: ""});
        localStorage.removeItem("auth");
        navigate('/');
        toast.success('logout success')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary px-2">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo01"
                        aria-controls="navbarTogglerDemo01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link to="/" className="navbar-brand">
                            🛒 Ecommerce App
                        </Link>
                        <div className="d-flex justify-content-center ms-auto me-auto">
                            <SearchInput/>
                        </div>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to={"/categories"}
                                    data-bs-toggle="dropdown"
                                >
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">
                                    {categories?.map((c) => (
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to={`/category/${c.slug}`}
                                            >
                                                {c.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="nav-item me-4">
                                <NavLink to="/cart" className="nav-link">
                                    <Badge className="fs-6 fw-bolder" count={cart?.length} showZero offset={[10, -5]}>
                                        Cart
                                    </Badge>
                                </NavLink>
                            </li>
                            {
                                auth.user != null
                                    ? (<>
                                        <div className="dropdown">
                                            {/*<label>{auth?.user?.role === 1 ? "admin" : "user"}</label>*/}
                                            <Avatar className="rounded-circle border border-2 border-primary"
                                                    id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"
                                                    alt={auth?.user?.name} src={"images"}/>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <li><a className="dropdown-item" href="/dashboard/user/profile">Profile</a></li>
                                                <li><a className="dropdown-item"
                                                       href={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>Dashboard </a>
                                                </li>
                                                <li>
                                                    <hr className="dropdown-divider"/>
                                                </li>
                                                <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
                                            </div>
                                        </div>
                                    </>)
                                    : (<>
                                        <li className="nav-item">
                                            <NavLink to="/register" className="nav-link">
                                                Register
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/login" className="nav-link">
                                                Login
                                            </NavLink>
                                        </li>
                                    </>)
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
