import axios from 'axios';

// Définir une instance Axios configurée avec les options de base
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // Base URL commune pour toutes les requêtes
  withCredentials: true,  // Assurez-vous d'inclure les informations d'identification (cookies, tokens)
});

// Endpoints
export const urlVerifyToken = "/spotify/verify-token";
export const urlGetTopSongs = "/spotify/top-tracks";
export const urlLogout = "/spotify/logout";
export const urlRegister = "/api/account/register";
export const urlLogin = "/api/account/login";
export const urlVerifySpotifyHub = "/api/account/verify";
export const urlLogoutSpotifyHub = "/api/account/logout";

// Fonction pour vérifier le token Spotify
export const verifyTokenSpotify = () => axiosInstance.get(urlVerifyToken);

// Fonction pour obtenir les meilleures chansons
export const getTopSongs = () => axiosInstance.get(urlGetTopSongs);

// Fonction pour se déconnecter de Spotify
export const logout = () => axiosInstance.post(urlLogout);

// Fonction d'enregistrement de l'utilisateur
export const register = (data) => axiosInstance.post(urlRegister, data);

// Fonction de connexion de l'utilisateur
export const login = (data) => axiosInstance.post(urlLogin, data);

// Fonction pour vérifier le token sur le serveur
export const verifyToken = () => axiosInstance.get(urlVerifySpotifyHub);

// Fonction pour se déconnecter de l'utilisateur sur le serveur
export const logoutUser = () => axiosInstance.post(urlLogoutSpotifyHub);
