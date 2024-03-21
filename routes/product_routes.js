import express from "express";
import {isAdmin, requireSignIn} from "../middlewares/auth_middleware.js";
import formidable from "express-formidable";
import {
    brainTreePaymentController, braintreeTokenController,
    createProductController,
    deleteProductController,
    getAllProductController,
    getProductByIdController, productCategoryController, productCountController,
    productFiltersController, productListController,
    productPhotoController, realtedProductController, searchProductController,
    updateProductController,
} from "../controllers/product_controllers.js";

const router = express.Router();


router.post(
    "/create",
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
);

router.put(
    "/update/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
)

router.get("/products", getAllProductController);

router.get("/product/:slug", getProductByIdController);

router.get("/product-photo/:pid", productPhotoController);

router.delete("/delete/:pid", deleteProductController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);


export default router
