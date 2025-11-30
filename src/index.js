import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import animalRoutes from "./routes/animalRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Melayani file Frontend statis
app.use(express.static("public"));

// Routes API
app.use("/api", animalRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app; // Penting untuk Vercel