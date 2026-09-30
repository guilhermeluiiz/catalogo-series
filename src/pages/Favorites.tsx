import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <main className="container">
      <h2>Minhas Séries Favoritas</h2>

      {favorites.length === 0 ? (
        <p className="message">
          Você ainda não possui séries favoritas.
        </p>
      ) : (
        <div className="series-grid">
          {favorites.map((serie) => (
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

                <Link
                  to={`/serie/${serie.id}`}
                  className="details-button"
                >
                  Ver detalhes
                </Link>

                <button
                  onClick={() => removeFavorite(serie.id)}
                  className="favorite-button"
                >
                  Remover dos favoritos
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}