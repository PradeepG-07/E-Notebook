import express from "express";
import authRoutes from "./routes/auth.js";
import notesRoutes from "./routes/notes.js";
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());


app.use('/api/auth',authRoutes);
app.use("/api/notes",notesRoutes);
export default app;