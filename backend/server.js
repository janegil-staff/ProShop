import express from "express";
import dotenv from "dotenv";
dotenv.config();
import productRoutes from './routes/productRoutes.js';
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const PORT = process.env.PORT || 5000;

connectDB();


const app = express();

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
