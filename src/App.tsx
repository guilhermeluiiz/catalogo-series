import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SerieDetails from "./pages/SerieDetails";
import Favorites from "./pages/Favorites";
import { FavoritesProvider } from "./context/FavoritesContext";

export default function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/serie/:id"
            element={<SerieDetails />}
          />

          <Route
            path="/favoritos"
            element={<Favorites />}
          />
        </Routes>
      </FavoritesProvider>
    </BrowserRouter>
  );
}