import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Serie } from "../types/Serie";
import { useFavorites } from "../context/FavoritesContext";

export default function Home() {
  const [series, setSeries] = useState<Serie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function fetchSeries() {
      try {
        setLoading(true);

        const response = await fetch("https://api.tvmaze.com/shows");

        if (!response.ok) {
          throw new Error("Erro ao buscar séries.");
        }

        const data: Serie[] = await response.json();

        setSeries(data);
      } catch (error) {
        console.error(error);
        setError("Não foi possível carregar as séries.");
      } finally {
        setLoading(false);
      }
    }

    fetchSeries();
  }, []);

  if (loading) {
    return <p className="message">Carregando séries...</p>;
  }

  if (error) {
    return <p className="message">{error}</p>;
  }

  return (
    <main className="container">
      <h2>Séries</h2>

      <div className="series-grid">
        {series.map((serie) => (
          <article className="serie-card" key={serie.id}>
            {serie.image ? (
              <img src={serie.image.medium} alt={serie.name} />
            ) : (
              <div className="no-image">Sem imagem</div>
            )}

            <div className="serie-info">
              <h3>{serie.name}</h3>

              <p>
                {serie.genres.length > 0
                  ? serie.genres.join(", ")
                  : "Sem gênero"}
              </p>

              <Link to={`/serie/${serie.id}`} className="details-button">
                Ver detalhes
              </Link>

              {isFavorite(serie.id) ? (
                <button
                  onClick={() => removeFavorite(serie.id)}
                  className="favorite-button"
                >
                  Remover dos favoritos
                </button>
              ) : (
                <button
                  onClick={() => addFavorite(serie)}
                  className="favorite-button"
                >
                  Adicionar aos favoritos
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}