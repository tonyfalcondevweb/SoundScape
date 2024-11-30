import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { verifyTokenSpotify } from "../Api/Api";

const SpotifyContext = createContext();

export const SpotifyProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyTokenSpotify()
      .then((response) => {
        setIsAuthenticated(response.data.isValid);
      })
      .catch((er) => {
        console.error("Erreur lors de la vérification du token:", er);

        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <SpotifyContext.Provider value={{ isAuthenticated, loading }}>
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotifyAuth = () => useContext(SpotifyContext);
