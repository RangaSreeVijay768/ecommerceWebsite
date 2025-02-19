import userModel from "../models/user_model.js";
import JWT from "jsonwebtoken";
import orderModel from "../models/order_model.js";
import {comparePassword, hashPassword} from "../helpers/auth_helper.js";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, passwordAgain, phone, address, answer } = req.body;
        //validations
        if (!name) {
            return res.send({ error: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }
        if (!phone) {
            return res.send({ message: "Phone no is Required" });
        }
        if (!address) {
            return res.send({ message: "Address is Required" });
        }
        if (!answer) {
            return res.send({ message: "Answer is Required" });
        }
        //check user
        const exisitingUser = await userModel.findOne({ email });
        //exisiting user
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Register please login",
            });
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            passwordAgain: password,
            answer,
        }).save();

        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Errro in Registeration",
            error,
        });
    }
};

//POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }
        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registerd",
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};


export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword, passwordAgain } = req.body;
        if (!email) {
            res.status(400).send({ message: "Emai is required" });
        }
        if (!answer) {
            res.status(400).send({ message: "answer is required" });
        }
        if (!newPassword) {
            res.status(400).send({ message: "New Password is required" });
        }
        //check
        const user = await userModel.findOne({ email, answer });
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email Or Answer",
            });
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed, passwordAgain: newPassword }, );
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};



//update prfole
export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone, passwordAgain } = req.body;
        const user = await userModel.findById(req.user._id);
        //password
        if (password && password.length < 6) {
            return res.json({ error: "Passsword is required and 6 character long" });
        }
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: password || user.password,
                phone: phone || user.phone,
                address: address || user.address,
                passwordAgain: passwordAgain || user.password
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Profile Updated SUccessfully",
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Update profile",
            error,
        });
    }
};

// update user by admin
// PUT Update User
export const updateUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        // Validation
        // if (!name || !email || !phone || !address || !role) {
        //     return res.status(400).send({
        //         success: false,
        //         message: "Name, email, phone, and address are required fields",
        //     });
        // }

        // Check if user exists
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        // Update user fields
        user.role = role;

        // Save updated user
        await user.save();

        res.status(200).send({
            success: true,
            message: "User updated successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while updating user",
            error,
        });
    }
};



//delete user
export const deleteUserController = async (req, res) => {
    try {
        const { id } = req.params;
        await userModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "User Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while deleting category",
            error,
        });
    }
};


//orders
export const getOrdersByUserController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ buyer: req.user._id })
            .populate("products", "-photo")
            .populate("buyer", "name");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};
//orders
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort();
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};

//order details
export const getOrderByIdController = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await orderModel
            .findById(orderId)
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort();
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};



//order status
export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Updateing Order",
            error,
        });
    }
};

// Delete order
export const deleteOrderController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const orders = await orderModel.findByIdAndDelete(
            orderId,
            { new: true }
        );
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Updateing Order",
            error,
        });
    }
};


//orders
export const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel
            .find({});
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting users",
            error,
        });
    }
};


export const testController = (req, res) => {
    try {
        res.send("Protected Routes");
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};


