import express from "express";
import {
    registerController,
    loginController,
    testController,
    forgotPasswordController,
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController, getAllUsersController, deleteUserController, updateUserController,
} from "../controllers/auth_controllers.js";
import { isAdmin, requireSignIn } from "../middlewares/auth_middleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

// Forgot password || POST
router.post("/forgot-password", forgotPasswordController)

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

// protected user route auth
router.get("/user", requireSignIn, (req, res) => {
    res.status(200).send({ok: true});
})

// protected admin route auth
router.get("/admin", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ok: true});
})

//all users
router.get("/all-users", requireSignIn, isAdmin, getAllUsersController);

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//update profile
router.put("/update/:id", requireSignIn, isAdmin, updateUserController);

// Delete user || DELETE
router.delete("/delete/:id", requireSignIn, deleteUserController)


//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
    "/order-status/:orderId",
    requireSignIn,
    isAdmin,
    orderStatusController
);


export default router;
