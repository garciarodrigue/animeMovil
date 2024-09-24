import React, { useEffect, useRef } from 'react';
import '../styles/search.css'
import '../styles/App.css'
import '../styles/app.css'
export const SearchResults = ({ searchResults, handleAnimeSelect }) => {
    return (
      <div className="search-results">
        {searchResults.length > 0 ? (
          searchResults.map((anime) => (
            <div key={anime.mal_id} className="search-result-item">
              <img src={anime.images.jpg.image_url} alt={anime.title} />
              <div
                className="anime-title"
                style={{ cursor: 'pointer' }} // Para que parezca clickeable
                onClick={() => handleAnimeSelect(anime)} // Pasar el anime seleccionado
              >
                <p>{anime.title}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </div>
    );
  };