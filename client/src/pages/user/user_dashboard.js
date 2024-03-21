import React from 'react'
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import {useAuth} from "../../context/auth";

function UserDashboard() {
    const [auth] = useAuth();
    return (
        <Layout>
            <div className="row mt-100px m-3 p-3">
                <div className="col-md-3">
                    <UserMenu/>
                </div>
                <div className="col-md-9">
                    <div className="card p-3 flex-column">
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
