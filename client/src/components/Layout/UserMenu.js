import React from 'react'
import {NavLink} from "react-router-dom";

function UserMenu() {
    return (
        <>
            <h4>User Dashboard</h4>
            <div className="list-group">
                <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">
                    Profile</NavLink>
                <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">
                    Orders</NavLink>
            </div>
        </>
    )
}

export default UserMenu
