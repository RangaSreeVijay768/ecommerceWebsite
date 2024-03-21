import express from "express";


import { isAdmin, requireSignIn } from "../middlewares/auth_middleware.js";
import {
    createCategoryController, deleteCategoryController,
    getAllCategoriesController, getCategoryByIdController,
    updateCategoryController
} from "../controllers/category_controllers.js";

//router object
const router = express.Router();

//routing

//Create category || METHOD POST
router.post("/create", requireSignIn, isAdmin, createCategoryController);

// Get all categories || GET
router.get("/categories", getAllCategoriesController);

// Get category by id || GET
router.get("/categories/:id", getCategoryByIdController);

// Update Category || PUT
router.put("/update/:id", requireSignIn, isAdmin, updateCategoryController)

// Delete Category || DELETE
router.delete("/delete/:id", requireSignIn, isAdmin, deleteCategoryController)


export default router;
