import dotenv from "dotenv";

dotenv.config();

const clientId = process.env.CLIENT_ID;
const redirectUri = process.env.REDIRECT_URI;

export const login = (req, res, next) => {
  try {
    const scopes = "user-top-read user-read-email";
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}`;

    req.authUrl = authUrl;
    next();
  } catch (error) {
    next(error);
  }
};
