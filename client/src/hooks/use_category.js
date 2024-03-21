import { useState, useEffect } from "react";
import axios from "axios";
import {toast} from "react-toastify";

export default function useCategory() {
    const [categories, setCategories] = useState([]);

    const getAllCategory = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/categories`);
            if (response.data.success) {
                setCategories(response.data.category);
            } else {
                throw new Error(response.data.message); // Throw error if success is false
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong in getting category");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    return categories;
}
