import React, { useState } from 'react';
import { Btonsb } from './Btonsb'; // Asegúrate de que la ruta sea correcta
import '../styles/btonsb.css'; // Importa el CSS específico del botón
import '../styles/search.css'; // Asegúrate de que el estilo de búsqueda esté correctamente importado

export const SearchBarButton = () => {
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Para almacenar el término de búsqueda
  const [searchResults, setSearchResults] = useState([]); // Para almacenar los resultados de búsqueda
  const [selectedAnime, setSelectedAnime] = useState(null); // Para almacenar el anime seleccionado
  const [isLoading, setIsLoading] = useState(false); // Para manejar el estado de carga

  const handleButtonClick = () => {
    setShowSearchOverlay(!showSearchOverlay); // Alternar visibilidad del overlay de búsqueda
  };

  // Función para manejar cambios en el input y hacer la búsqueda
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) { // Comenzar la búsqueda si el término es mayor a 2 caracteres
      setIsLoading(true);

      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
        const data = await res.json();

        if (data.data) {
          setSearchResults(data.data); // Almacenar los resultados
        }
      } catch (error) {
        console.error("Error al buscar animes:", error);
      }

      setIsLoading(false);
    } else {
      setSearchResults([]); // Limpiar los resultados si el input tiene menos de 3 caracteres
    }
  };

  // Función para manejar la selección de un anime y almacenar sus datos
  const handleAnimeSelect = (anime) => {
    const generos = anime.genres.map(genre => genre.name).join(", "); // Obtener los géneros en formato de cadena
    const urlimg = anime.images.jpg.image_url; // Obtener la URL de la imagen

    // Almacenar los datos seleccionados en el estado
    setSelectedAnime({
      nombre: anime.title,
      nombreOr: anime.title_japanese,
      fans: anime.members,
      sinopsis: anime.synopsis,
      episodios: anime.episodes,
      urlimg: urlimg,
      genero: generos,
      year: anime.year || "Desconocido", // Asegurarse de que no sea undefined
      status: anime.status,
    });

    // Opcional: cerrar el overlay una vez que se selecciona un anime
    setShowSearchOverlay(false);
  };

  return (
    <>
      {/* Botón de búsqueda */}
      <Btonsb 
        urlimg={"/svgs/search-icon.svg"}
        funcionClick={handleButtonClick} 
      />

      {/* Mostrar el overlay cuando showSearchOverlay es true */}
      {showSearchOverlay && (
        <div className="search-overlay">
          <input 
            type="text" 
            placeholder="Buscar anime..." 
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange} // Llama a la función de búsqueda cada vez que cambia el input
          />

          {/* Mostrar un mensaje de carga mientras se hace la búsqueda */}
          {isLoading && <p>Buscando...</p>}

          {/* Mostrar los resultados de búsqueda */}
          <div className="search-results">
            {searchResults.length > 0 ? (
              searchResults.map((anime) => (
                <div 
                  key={anime.mal_id} 
                  className="search-result-item"
                  onClick={() => handleAnimeSelect(anime)} // Almacenar los datos del anime seleccionado
                >
                  <img src={anime.images.jpg.image_url} alt={anime.title} className="search-result-image" />
                  <div>
                    <h4>{anime.title}</h4>
                    <p>Episodios: {anime.episodes ? anime.episodes : 'Desconocido'}</p>
                  </div>
                </div>
              ))
            ) : (
              searchQuery.length > 3 && !isLoading && <p>No se encontraron resultados</p>
            )}
          </div>
        </div>
      )}
      
      

      {/* Mostrar los detalles del anime seleccionado (opcional) */}
      {selectedAnime && (
        <div className="selected-anime">
          <h3>{selectedAnime.nombre}</h3>
          <p><strong>Nombre original:</strong> {selectedAnime.nombreOr}</p>
          <p><strong>Fans:</strong> {selectedAnime.fans}</p>
          <p><strong>Sinopsis:</strong> {selectedAnime.sinopsis}</p>
          <p><strong>Episodios:</strong> {selectedAnime.episodios}</p>
          <p><strong>Género(s):</strong> {selectedAnime.genero}</p>
          <p><strong>Año:</strong> {selectedAnime.year}</p>
          <p><strong>Estado:</strong> {selectedAnime.status}</p>
          <img src={selectedAnime.urlimg} alt={selectedAnime.nombre} />
        </div>
      )}
      
      {/* <section className="select-anime">
        <Media/>
         <Informacion
          nombre={selectedAnime.nombre}
          nombreOr={selectedAnime.nombreOr}
          fans={selectedAnime.fans}
          sinopsis={selectedAnime.sinopsis}
          episodios={selectedAnime.episodios}
          urlimg={selectedAnime.urlimg}
          genero={selectedAnime.genero}
          year={selectedAnime.year}
          status={selectedAnime.status}
        />
      </section> */}
    </>
  );
};

export default SearchBarButton;
