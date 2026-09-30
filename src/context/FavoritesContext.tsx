/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Serie } from "../types/Serie";

interface FavoritesContextType {
  favorites: Serie[];
  addFavorite: (serie: Serie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Serie[]>([]);

  function addFavorite(serie: Serie) {
    setFavorites((currentFavorites) => {
      const alreadyExists = currentFavorites.some(
        (favorite) => favorite.id === serie.id
      );

      if (alreadyExists) {
        return currentFavorites;
      }

      return [...currentFavorites, serie];
    });
  }

  function removeFavorite(id: number) {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((favorite) => favorite.id !== id)
    );
  }

  function isFavorite(id: number) {
    return favorites.some((favorite) => favorite.id === id);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites deve ser utilizado dentro de FavoritesProvider"
    );
  }

  return context;
}