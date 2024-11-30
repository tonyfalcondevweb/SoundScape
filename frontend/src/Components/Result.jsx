import React, { useState, useEffect } from "react";
import Container from "./Commons/Container";
import Loading from "./Commons/Loading";
import { getTopSongs, logout } from "../Api/Api";
import TopSong from "./TopSong";
import Recommendation from "./Recommendation";
import Button from "./Commons/Button";
import { useUser } from "../Contexts/UserContext";

const Result = () => {
  const [loading, setLoading] = useState(true);
  const [topSongs, setTopSongs] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const { logout: contextLogout } = useUser();

  useEffect(() => {
    if (!dataFetched) {
      getTopSongs()
        .then((response) => {
          setTopSongs(response.data.topTracks);
          setRecommendations(response.data.recommendations);
          setDataFetched(true);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des chansons :", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [dataFetched]);

  const handleLogout = () => {
    logout()
      .then((response) => {
        console.log(response.data);
        
        const spotifyLogoutWindow = window.open(
          'https://accounts.spotify.com/logout',
          'Spotify Logout',
          'width=400,height=400'
        );
        
        contextLogout();
        
        setTimeout(() => {
          if (spotifyLogoutWindow) {
            spotifyLogoutWindow.close();
          }
          window.location.href = "/";
        }, 300);
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  };

  if (loading) return <Loading />;

  return (
    <Container className={"lg:flex lg:justify-center lg:space-x-52 relative"}>
      {/* <Recommendation recommendations={recommendations} /> */}
      <TopSong topSongs={topSongs} />
      <Button
        classAdd="fixed lg:top-8 lg:right-8 lg:px-6 lg:py-4 top-4 right-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-110 flex items-center gap-2"
        onClick={handleLogout}
      >
        <i className="fa-solid fa-right-from-bracket"></i>
      </Button>
    </Container>
  );
};

export default Result;
