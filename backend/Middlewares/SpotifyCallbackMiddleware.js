import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;

export const callback = async (req, res, next) => {
  try {
    const { code } = req.query;

    if (!code) {
      throw new Error("Missing authorization code");
    }

    const tokenUrl = "https://accounts.spotify.com/api/token";
    const data = new URLSearchParams({
      code,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      client_id: clientId,
      client_secret: clientSecret,
    });

    const response = await axios.post(tokenUrl, data.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    req.accessToken = response.data.access_token;
    next();
  } catch (error) {
    next(error);
  }
};
