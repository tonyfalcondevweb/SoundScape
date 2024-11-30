// Recommendation.js
import React from 'react';

const Recommendation = ({ recommendations }) => {
  return (
    <div className="bg-slate-800 h-full p-4 shadow-lg rounded-lg mb-6 lg:mb-0 lg:mr-4 lg:w-96">
      <h2 className="text-xl py-5 font-semibold mb-3 text-center text-white">
        Recommandations
      </h2>
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <a
            key={rec.id}
            href={rec.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-4 bg-slate-700 p-3 rounded-md hover:bg-slate-600 transition-transform duration-200 ease-in-out transform hover:scale-105"
          >
            <img
              src={rec.album.images[0].url}
              alt={`${rec.name} cover`}
              className="w-12 h-12 rounded-md"
            />
            <div className="flex-1">
              <p className="text-gray-200 font-medium">{rec.name}</p>
              <p className="text-gray-400 text-sm">
                {rec.artists.map((artist) => artist.name).join(', ')}
              </p>
            </div>
            <i className="fa-brands fa-spotify fa-2xl text-green-500"></i>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Recommendation;
