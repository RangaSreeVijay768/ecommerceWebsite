import React from 'react'
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import {useAuth} from "../../context/auth";

function UserDashboard() {
    const [auth] = useAuth();
    return (
        <Layout>
            <div className="row m-3 p-3">
                <div className="col-3">
                    <UserMenu/>
                </div>
                <div className="col-9">
                    <div className="card w-75 p-3 flex-column">
                        <label className="fs-4">User name : {auth?.user?.name}</label>
                        <label className="fs-4">User Email : {auth?.user?.email}</label>
                        <label className="fs-4">User Contact : {auth?.user?.phone}</label>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UserDashboard
