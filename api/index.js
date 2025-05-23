import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "../config/db.js";
import authRoutes from "../routes/auth_routes.js";
import categoryRoutes from "../routes/categoty_routes.js";
import cors from "cors";
import productRoutes from "../routes/product_routes.js";
import pdfRoutes from "../routes/pdf_routes.js";

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();




//middelwares
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));
// app.use(express.static(path.join(__dirname, './client/build')))

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/pdf", pdfRoutes);

// //rest api
// app.use("*", function(req, res) {
//     res.sendfile(path.join(__dirname, './client/build/index.html'));
// });

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(
        `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
            .white
    );
});
