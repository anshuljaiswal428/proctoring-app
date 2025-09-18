import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/uploadRoutes.js"

const app = express();
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "https://proctoringbyanshul.vercel.app"];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
}));

app.use(express.json());

app.use("/api", uploadRoutes);

app.get("/", (req, res) =>{
    res.send("Proc API test is running");
});


export default app;