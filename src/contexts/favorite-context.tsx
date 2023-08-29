import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Hero } from '../models';

type FavoritesContextType = {
    addFavorite: (hero: Hero) => boolean;
    removeFavorite: (heroId: number) => void;
    isFavorite: (heroId: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<Hero[]>(() => {
        const heroesFavorited = localStorage.getItem('heroesFavorited');
        return JSON.parse(heroesFavorited ?? '[]') as Hero[];
    });

    const addFavorite = (hero: Hero) => {
        if (favorites.length === 5) {
            alert('Você não pode favoritar mais de 5 heróis');
            return false;
        }

        if (!favorites.some((x) => x.id === hero.id)) {
            setFavorites((prevFavorites) => [...prevFavorites, hero]);
            localStorage.setItem('heroesFavorited', JSON.stringify([...favorites, hero]));
        }

        return true;
    };

    const removeFavorite = (heroId: number) => {
        const updatedFavorites = favorites.filter((x) => x.id !== heroId);
        setFavorites(updatedFavorites);
        localStorage.setItem('heroesFavorited', JSON.stringify(updatedFavorites));
    };

    const isFavorite = (heroId: number) => favorites.some((x) => x.id === heroId);

    return (
        <FavoritesContext.Provider value={{ addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites deve ser usado dentro de um FavoritesProvider');
    }
    return context;
};
