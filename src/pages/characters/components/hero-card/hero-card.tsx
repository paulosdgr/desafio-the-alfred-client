import React, { useEffect, useState } from 'react';
import { Checkbox } from '../../../../shared/checkbox/checkbox';
import './hero-card.scss';
import { useFavorites } from '../../../../contexts/favorite-context';
interface HeroCardProps {
    name: string;
    id: number;
    imageUrl: string;
    onClick?: () => void;
}

export const HeroCard: React.FC<HeroCardProps> = ({ name, id, imageUrl, onClick }) => {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const [checked, setChecked] = useState(isFavorite(id));

    const handleFavorite = () => {
        if (checked) {
            removeFavorite(id);
            setChecked(!checked);
            return;
        }

        const result = addFavorite({ id, name, image: imageUrl });
        if (!result) {
            return;
        }
        setChecked(!checked);
    };

    useEffect(() => {
        setChecked(isFavorite(id));
    }, [id, isFavorite]);

    return (
        <section className="c-hero-card">
            <img onClick={onClick} className="c-hero-card__image" src={imageUrl} alt={name} />

            <section className="c-hero-card__footer">
                <p>{name}</p>
                <Checkbox checked={checked} onChange={handleFavorite} />
            </section>
        </section>
    );
};
