import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function Navbar() {
  const { favorites } = useFavorites();

  return (
    <nav className="navbar">
      <h1>TV Series</h1>

      <div className="nav-links">
        <Link to="/">Séries</Link>

        <Link to="/favoritos">
          Favoritos ({favorites.length})
        </Link>
      </div>
    </nav>
  );
}