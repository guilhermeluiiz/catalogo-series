import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Serie } from "../types/Serie";
import { useFavorites } from "../context/FavoritesContext";

export default function SerieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [serie, setSerie] = useState<Serie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function fetchSerie() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://api.tvmaze.com/shows/${id}`
        );

        if (!response.ok) {
          throw new Error("Série não encontrada.");
        }

        const data: Serie = await response.json();

        setSerie(data);
      } catch (error) {
        console.error(error);
        setError("Não foi possível carregar os dados da série.");
      } finally {
        setLoading(false);
      }
    }

    fetchSerie();
  }, [id]);

  if (loading) {
    return <p className="message">Carregando série...</p>;
  }

  if (error || !serie) {
    return <p className="message">{error || "Série não encontrada."}</p>;
  }

  return (
    <main className="container">
      <button onClick={() => navigate("/")} className="back-button">
        ← Voltar
      </button>

      <section className="details">
        {serie.image && (
          <img
            src={serie.image.original}
            alt={serie.name}
          />
        )}

        <div className="details-info">
          <h2>{serie.name}</h2>

          <p>
            <strong>Gêneros:</strong>{" "}
            {serie.genres.length > 0
              ? serie.genres.join(", ")
              : "Não informado"}
          </p>

          <p>
            <strong>Nota:</strong>{" "}
            {serie.rating.average ?? "Não disponível"}
          </p>

          <div
            className="summary"
            dangerouslySetInnerHTML={{
              __html: serie.summary || "Resumo não disponível.",
            }}
          />

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
      </section>
    </main>
  );
}