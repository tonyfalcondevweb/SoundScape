import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const TASTEDIVE_API_KEY = process.env.TASTEDIVE_API_KEY;

export const getTopTracks = async (req, res, next) => {
  const accessToken = req.cookies.spotifyAccessToken;

  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "Not authenticated. Missing token." });
  }

  try {
    // Requête top 10
    const topTracksResponse = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit: 10,
          time_range: "medium_term",
        },
      }
    );

    const topTracks = topTracksResponse.data.items;





    // Modifier la partie avec forEach pour utiliser Promise.all
    const topTracksWithRecommendations = await Promise.all(
      topTracks.map(async (track) => {
        try {
          const artistName = encodeURIComponent(track.artists[0].name.replace(/[^\w\s]/gi, ''));
          const tasteDiveResponse = await axios.get(
            `https://tastedive.com/api/similar?q=${artistName}&type=movie&k=${TASTEDIVE_API_KEY}&limit=1&info=1`
          );
          
          // Vérifier si on a des résultats
          const recommendation = tasteDiveResponse.data.similar.results[0] || {
            name: `Aucun film trouvé en lien avec ${track.artists[0].name}`,
            yUrl: null
          };
          
          track.tasteDiveRecommendation = recommendation;
          return track;
        } catch (error) {
          console.error(`Erreur pour l'artiste ${track.artists[0].name}:`, error);
          track.tasteDiveRecommendation = {
            name: `Aucun film trouvé en lien avec ${track.artists[0].name}`,
            yUrl: null
          };
          return track;
        }
      })
    );



    req.topTracks = topTracksWithRecommendations;

    // Obtenir les IDs des artistes et des pistes pour les recommandations
    const seedArtists = topTracks.slice(0, 2).map(track => track.artists[0].id);
    const seedTracks = topTracks.slice(0, 3).map(track => track.id);

    // Obtenir les recommandations Spotify
    try {
      const recommendationsResponse = await axios.get(
        'https://api.spotify.com/v1/recommendations',
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
          params: {
            seed_artists: seedArtists.join(','),
            seed_tracks: seedTracks.join(','),
            limit: 5,
            market: 'FR'
          }
        }
      );

      req.recommendations = recommendationsResponse.data.tracks;
    } catch (error) {
      console.error("Erreur lors de la récupération des recommandations:", error.message);
      req.recommendations = [];
    }

    next();
  } catch (error) {
    console.error(
      "Error while fetching top 10 or recommendations:",
      error
    );
    return res
      .status(500)
      .json({ message: "Error while fetching data." });
  }
};
