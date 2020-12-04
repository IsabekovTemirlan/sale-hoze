import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import adRoutes from "./routes/ads.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb", extended: true}));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use('/ads', adRoutes);
app.use('/auth', authRoutes);

const CONNECTION_URL = 'mongodb+srv://isabekovtemirlan:isabekov99@cluster0.nci92.mongodb.net/<dbname>?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.set('useCreateIndex', true);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
	.catch((error) => console.log(error));

mongoose.set('useFindAndModify', false);