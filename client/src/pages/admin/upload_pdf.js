import React, {useEffect, useState} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminMenu from "../../components/Layout/AdminMenu";
import {Select} from "antd";

const {Option} = Select;

function UploadPdf() {
    const [pdf, setPdf] = useState(null);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);

    const getAllCategory = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/branch/getAll`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something wwent wrong in getting catgeory");
        }
    };
    useEffect(() => {
        getAllCategory();
    }, []);


    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            if (!pdf) {
                toast.error("Please select a PDF file.");
                return;
            }

            if (!category) {
                toast.error("Please select a category.");
                return;
            }

            const pdfData = new FormData();
            pdfData.append("pdf", pdf);
            pdfData.append("category", category); // Add category to FormData
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/pdf/upload`,
                pdfData
            );
            if (data.success) {
                toast.success("PDF Uploaded Successfully");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const handlePdfChange = (e) => {
        setPdf(e.target.files[0]);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    return (
        <div className="row mt-100px m-3 p-3">
            <div className="col-md-3">
                <AdminMenu />
            </div>
            <div className="col-md-9 mt-4">
                <h1>Create Pdf</h1>
                <div className="m-1">
                    <div className="mb-3">
                        <label className="btn btn-outline-secondary col-md-12">
                            {pdf ? pdf.name : "Upload PDF"}
                            <input
                                type="file"
                                name="pdf"
                                accept="application/pdf"
                                onChange={handlePdfChange}
                                hidden
                            />
                        </label>
                    </div>
                    <div className="mb-3">
                        <Select
                            bordered={false}
                            placeholder="Select a category"
                            size="large"
                            showSearch
                            className="form-select mb-3"
                            onChange={(value) => {
                                setCategory(value);
                            }}
                        >
                            {categories?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="mb-3">
                        {pdf && (
                            <div className="text-center">
                                <embed
                                    src={URL.createObjectURL(pdf)}
                                    type="application/pdf"
                                    width="100%"
                                    height="400px"
                                />
                            </div>
                        )}
                    </div>

                    <div className="mb-3">
                        <button className="btn btn-primary" onClick={handleCreate}>
                            UPLOAD PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadPdf;
