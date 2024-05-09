import PdfModel from '../models/pdf_models.js';
import fs from 'fs';
import pdfModel from "../models/pdf_models.js";
import productModel from "../models/product_model.js";
import slugify from "slugify";

// POST Upload PDF File
export const uploadPdfController = async (req, res) => {
    try {

        const {pdf} = req.files;


        const pdfs = new pdfModel();
        if (pdf) {
            pdfs.pdf.data = fs.readFileSync(pdf.path);
            pdfs.pdf.contentType = pdf.type;
        }
        await pdfs.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            pdfs,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating product",
        });
    }
};

export const getPdfController = async (req, res) => {
    try {
        const pdf = await pdfModel.findById(req.params.pid).select("pdf");
        if (pdf.pdf.data) {
            res.set("Content-type", pdf.pdf.contentType);
            return res.status(200).send(pdf.pdf.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting photo",
            error,
        });
    }
};
