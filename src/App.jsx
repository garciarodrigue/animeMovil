import { useEffect, useState } from "react";
import {SearchBar} from './components/BtnSearch.jsx'
import { Topanime } from './components/top.jsx';
import './styles/App.css';
import './styles/app.css';
function App() {

  const [recentAnimes, setRecentAnimes] = useState([]);
  const [previousMonth, setPreviousMonth] = useState(false);
  
  // Función para obtener los animes recientes
    const getRecentAnimes = (getPreviousMonth = false) => {
    const today = new Date();
    const endDate = today.toISOString().split('T')[0];
    const startDate = new Date(today);

    if (getPreviousMonth) {
      startDate.setMonth(today.getMonth() - 2); // Mes anterior (2 meses atrás)
    } else {
      startDate.setMonth(today.getMonth() - 1); // Mes actual (1 mes atrás)
    }

    const startDateFormatted = startDate.toISOString().split('T')[0];
    const requestUrl = `https://api.jikan.moe/v4/anime?start_date=${startDateFormatted}&end_date=${endDate}`;

    fetch(requestUrl)
      .then(response => response.json())
      .then(data => {
        setRecentAnimes(data.data);
      })
      .catch(error => {
        console.error('Error al obtener los animes:', error);
      });
  };

  // Efecto para cargar los animes al iniciar y cuando se cambia de mes
  useEffect(() => {
    getRecentAnimes(previousMonth);
  }, [previousMonth]);

  // Manejador para cambiar al mes anterior
  const handlePreviousMonthClick = () => {
    setPreviousMonth(true);
  };

  return (
    <>
      <header className="section_compani">
        <h1>AnimeTotal</h1>
        <p>new</p>
        <SearchBar />
         {/* Componente combinado con barra de búsqueda y botón */}
      </header>
      
      <section className="container">
        <div className="column">
          {recentAnimes.map((anime, index) => (
            <div key={index} className="producto">
              <p className="fecha">
                <small>Estreno: </small>
                {anime.aired?.from ? new Date(anime.aired.from).toLocaleDateString() : "Fecha no disponible"}
              </p>
              <br />
              {anime.images?.jpg?.large_image_url && (
                <img src={anime.images.jpg.large_image_url} alt={anime.title} />
              )}
              <p>{anime.title}</p>
              <br/>
              <small>Episodios: {anime.episodes}</small>
            </div>
          ))}
        </div>
      </section>

      <button onClick={handlePreviousMonthClick}>Mes anterior</button>
    
      <Topanime />
      {/* Componente adicional Topanime */}
    </>
  );
}

export default App;
