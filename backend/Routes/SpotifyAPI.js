import { Router } from "express";
import { login } from "../Middlewares/SpotifyLoginMiddleware.js";
import { callback } from "../Middlewares/SpotifyCallbackMiddleware.js";
import { verifyToken } from "../Middlewares/SpotifyTokenMiddleware.js";
import { getTopTracks } from "../Middlewares/SpotifyResultMiddleware.js";

const router = Router();

router.get("/login", login, (req, res) => {
  res.redirect(req.authUrl);
});

router.post("/logout", (req, res) => {
  res.clearCookie("spotifyAccessToken", {
    httpOnly: true,
    secure: true,
    path: "/",
  });
  res.send("Cookie deleted");
});

router.get("/callback", callback, (req, res) => {
  res.cookie("spotifyAccessToken", req.accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 3600 * 1000,
  });

  const redirectFront = process.env.REDIRECT_FRONT;

  res.redirect(redirectFront + "/dashboard"); // Rediriger vers le dashboard
});

router.get("/verify-token", verifyToken, (req, res) => {
  res.json({
    isValid: true,
    user: req.user,
  });
});

router.get("/top-tracks", getTopTracks, (req, res) => {
  res.json({
    topTracks: req.topTracks,
    recommendations: req.recommendations,
  });
});

export default router;
