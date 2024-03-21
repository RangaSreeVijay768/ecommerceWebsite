import React, {useState} from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import toast from "react-hot-toast";

function DeleteProductModal({pid}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(
                `${process.env.REACT_APP_API}/api/v1/product/delete/${pid}`
            );
            if (data.success) {
                toast.success(`category is deleted`);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };


    return (
        <>
            <Button className="btn btn-primary my-2" onClick={handleShow}>
                Delete Product
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Button className="p-4" onClick={handleDelete(pid)}>
                    Delete
                </Button>
            </Modal>
        </>
    )
}

export default DeleteProductModal
