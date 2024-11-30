import React, { useState } from "react";

const TopSong = ({ topSongs }) => {
  const [selectedSongId, setSelectedSongId] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [closingSongId, setClosingSongId] = useState(null);

  const handleClick = (songId) => {
    if (selectedSongId === songId) {
      setIsClosing(true);
      setClosingSongId(songId);
      setTimeout(() => {
        setSelectedSongId(null);
        setIsClosing(false);
        setClosingSongId(null);
      }, 300);
    } else if (selectedSongId) {
      setIsClosing(true);
      setClosingSongId(selectedSongId);
      setTimeout(() => {
        setIsClosing(false);
        setClosingSongId(null);
        setSelectedSongId(songId);
      }, 300);
    } else {
      setSelectedSongId(songId);
    }
  };


  return (
    <div className="bg-slate-800 h-full p-4 shadow-lg rounded-lg">
      <h2 className="text-xl py-3 font-semibold mb-3 text-center text-white">
        Top 10
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-600">
          <thead>
            <tr>
              <th className="text-left text-gray-200">#</th>
              <th className="text-left text-gray-200">Couverture</th>
              <th className="text-left text-gray-200">Titre</th>
              <th className="text-left text-gray-200">Artiste(s)</th>
              <th className="text-left text-gray-200">Popularité</th>
              <th className="text-left text-gray-200">Écouter</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-600">
            {topSongs.slice(0, 10).map((song, index) => (
              <React.Fragment key={song.id}>
                <tr
                  onClick={() => handleClick(song.id)}
                  className="hover:bg-slate-600 cursor-pointer transition-colors duration-200"
                >
                  <td className="p-3 text-gray-400 text-lg font-semibold">
                    {index + 1}
                  </td>
                  <td className="p-3">
                    <img
                      src={song.album.images[0].url}
                      alt={`${song.name} cover`}
                      className="w-12 h-12 rounded-md"
                    />
                  </td>
                  <td className="p-3 text-gray-200 font-medium w-32 truncate">
                    {song.name}
                  </td>
                  <td className="p-3 text-gray-400 text-sm w-32 truncate">
                    {song.artists.map((artist) => artist.name).join(", ")}
                  </td>
                  <td className="p-3">
                    <div className="w-16 h-4 bg-gray-600 border-2 border-slate-500 rounded-full relative">
                      <div
                        className="h-full bg-green-600 rounded-full"
                        style={{ width: `${song.popularity}%` }}
                      >
                        <span className="absolute inset-0 flex items-center justify-center text-xs text-white">
                          {song.popularity}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <a
                      href={song.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-green-500 hover:text-green-400 transition-colors duration-200"
                    >
                      <i class="fa-brands fa-spotify fa-2xl"></i>
                    </a>
                  </td>
                </tr>
                {(selectedSongId === song.id || closingSongId === song.id) && song.tasteDiveRecommendation && (
                  <tr className="bg-slate-700">
                    <td colSpan="6" className="overflow-hidden">
                      <div className={`${closingSongId === song.id ? 'animate-slideUp' : 'animate-slideDown'}`}>
                        <div className="bg-slate-800 rounded-lg p-6 shadow-md flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-200 font-medium">
                              {song.tasteDiveRecommendation.name}
                            </span>
                            <span className="px-2 py-1 bg-slate-600 rounded-full text-xs text-gray-300">
                              Film
                            </span>
                          </div>

                          <div className="flex gap-3">
                            {song.tasteDiveRecommendation.yUrl && (
                              <a
                                href={song.tasteDiveRecommendation.yUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-colors duration-200"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <i className="fa-brands fa-youtube"></i>
                                Bande annonce
                              </a>
                            )}
                            {!song.tasteDiveRecommendation.name.startsWith('Aucun film trouvé') && (
                              <button 
                                className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-full transition-colors duration-200"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(`https://www.google.com/search?q=${encodeURIComponent(song.tasteDiveRecommendation.name + ' film')}`, '_blank');
                                }}
                              >
                                <i className="fas fa-info-circle mr-2"></i>
                                Plus d'infos
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSong;
