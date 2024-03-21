import React from 'react'
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import {useAuth} from "../../context/auth";

const AdminDashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout>
            <div className="row m-3 p-3">
                <div className="col-3">
                    <AdminMenu/>
                </div>
                <div className="col-9">
                    <div className="card w-75 p-3 flex-column">
                        <label className="fs-4">Admin name   : {auth?.user?.name}</label>
                        <label className="fs-4">Admin Email  : {auth?.user?.email}</label>
                        <label className="fs-4">Admin Contact : {auth?.user?.phone}</label>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard
