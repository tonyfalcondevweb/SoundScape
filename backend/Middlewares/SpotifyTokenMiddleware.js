import axios from "axios";

export const verifyToken = async (req, res, next) => {
  const accessToken = req.cookies.spotifyAccessToken;

  if (!accessToken) {
    return res.status(401).json({ isValid: false });
  }

  try {
    const userResponse = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    req.user = {
      id: userResponse.data.id,
      displayName: userResponse.data.display_name,
      email: userResponse.data.email,
    };

    next();
  } catch (error) {
    console.error("Erreur lors de la vérification du token:", error);
    return res.status(401).json({ isValid: false });
  }
};
