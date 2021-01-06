import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import adRoutes from "./routes/ads.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import commentsRoutes from "./routes/comments.routes.js";

import config from "./config.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb", extended: true}));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use('/ads', adRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/comments', commentsRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL || config.CONNECTION_URL;
const PORT = process.env.PORT || config.PORT;

mongoose.set('useCreateIndex', true);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
	.catch((error) => console.log(error));

mongoose.set('useFindAndModify', false);