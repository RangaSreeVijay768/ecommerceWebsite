import React from 'react'
import {NavLink} from "react-router-dom";

function AdminMenu() {
    return (
        <>
            <h4>Admin Panel</h4>
            <div className="list-group">
                <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Create
                    Category</NavLink>
                <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create
                    Product</NavLink>
                <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">All Products</NavLink>
                <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action">All Orders</NavLink>

                <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
            </div>
        </>
    )
}

export default AdminMenu
