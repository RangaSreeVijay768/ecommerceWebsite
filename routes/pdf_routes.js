import express from "express";
import {getPdfController, uploadPdfController} from "../controllers/pdf_controllers.js";
import formidable from "express-formidable";
import {productPhotoController} from "../controllers/product_controllers.js";

const router = express.Router();


router.post('/upload', formidable(), uploadPdfController);

router.get("/pdf/:pid", getPdfController);



export default router;
