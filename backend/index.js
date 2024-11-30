import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import spotifyRoutes from "./Routes/SpotifyAPI.js";
import { connect } from "mongoose";
import accountRoutes from "./Routes/AccountRoute.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares de sécurité
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Si vous souhaitez restreindre l'accès à une origine spécifique (par exemple, localhost:5173), faites comme suit :
app.use(
  cors({
    origin: process.env.REDIRECT_FRONT,
    credentials: true,
  })
);

// Fonction de connexion à MongoDB
const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Soundscape API");
});
app.use("/api/account", accountRoutes);
app.use("/spotify", spotifyRoutes);

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("An error occurred!");
});

// serveur uniquement si ce n'est pas en mode test
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
