import React, { useState } from 'react';
import { Btonsb } from './Btonsb'; // Asegúrate de que la ruta sea correcta
import { SearchResults } from './AnimeSelection';
import '../styles/search.css'
import "../styles/app.css"
import "../styles/App.css"

 // Importa el CSS específico del botón // Asegúrate de que el estilo de búsqueda esté correctamente importado

 export const SearchBar = ({ handleAnimeSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      setIsLoading(true);
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
        const data = await res.json();
        if (data.data) {
          setSearchResults(data.data);
        }
      } catch (error) {
        console.error('Error al buscar animes:', error);
      }
      setIsLoading(false);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar anime..."
        className="search-input"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {isLoading && <p>Cargando...</p>}
      {/* Pasar searchResults como prop al componente SearchResults */}
      <SearchResults searchResults={searchResults} handleAnimeSelect={handleAnimeSelect} />
   
    </div>
  );
};