import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Book from '../../assets/icons/book.svg';
import Movie from '../../assets/icons/movie.svg';
import Logo from '../../assets/images/logo.png';
import { useFavorites } from '../../contexts/favorite-context';
import { Comic, Hero, HeroResponse } from '../../models';
import { GET_HERO_BY_ID } from '../../queries/queries';
import { Checkbox } from '../../shared/checkbox/checkbox';
import { Search } from '../../shared/search/search';
import './character-detail.scss';

export const CharacterDetail: React.FC = () => {
    const { characterId } = useParams();
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const [checked, setChecked] = useState(isFavorite(+characterId!));
    const [hero, setHero] = useState<Hero | undefined>(undefined);
    const [comics, setComics] = useState<Comic[]>([]);
    const { loading, data } = useQuery(GET_HERO_BY_ID, {
        variables: {
            id: +characterId!,
        },
    });

    const defaultDescription =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit, felis id laoreet gravida, purus metus interdum tortor, nec varius lectus tellus eu dolor. Nullam commodo in lectus a vestibulum. Maecenas ut facilisis leo. Integer pellentesque erat ut tellus vestibulum, in sollicitudin quam rhoncus.';

    useEffect(() => {
        if (loading) {
            return;
        }

        const heroResponse = data?.getCharacterById as HeroResponse;
        setHero({
            id: heroResponse.id,
            name: heroResponse.name,
            image: `${heroResponse.thumbnail.path}.${heroResponse.thumbnail.extension}`,
            description: heroResponse.description,
        });

        setComics(
            heroResponse.comics?.map(
                (comic) =>
                    ({
                        id: comic.id,
                        title: comic.title,
                        image: `${comic.images[0].path}.${comic.images[0].extension}`,
                    }) as Comic,
            ) ?? [],
        );
    }, [data, loading]);
    const handleFavorite = () => {
        if (checked) {
            removeFavorite(hero!.id);
            setChecked(!checked);
            return;
        }

        const result = addFavorite(hero!);
        if (!result) {
            return;
        }
        setChecked(!checked);
    };

    const formatName = (text: string | undefined) => {
        if (!text) {
            return '';
        }

        const index = text.indexOf('(');
        if (index === -1) {
            return text;
        }

        return text.substring(0, index - 1);
    };

    return (
        <section className="c-character-detail-container">
            <div className="c-character-detail-container__hero-background">{formatName(hero?.name)}</div>

            <header className="c-character-detail-header">
                <img src={Logo} className="c-character-detail-header__logo" alt="Logo" />
                <Search placeholder="Procure por heróis" />
            </header>

            <section className="c-character-detail-content">
                <section className="c-character-detail-content__left">
                    <section className="c-character-detail-content__title">
                        <h1>{formatName(hero?.name)}</h1>
                        <Checkbox checked={checked} onChange={handleFavorite} />
                    </section>

                    <article className="c-character-detail-content__description">
                        {hero?.description || defaultDescription}
                    </article>

                    <section className="c-character-detail-content__info">
                        <div>
                            <p>Quadrinhos</p>
                            <div>
                                <img src={Book} alt="Book" />
                                3000
                            </div>
                        </div>
                        <div>
                            <p>Filmes</p>
                            <div>
                                <img src={Movie} alt="Movie" />
                                40
                            </div>
                        </div>
                    </section>
                </section>
                <section className="c-character-detail-content__right">
                    <img src={hero?.image} alt={hero?.name} />
                </section>
            </section>

            <section className="c-character-detail-comics">
                <h1>Últimos lançamentos</h1>
                <section className="c-character-detail-comics__container">
                    {comics.map((comic) => (
                        <section className="c-character-detail-comics__item" key={comic.id}>
                            <img src={comic.image} alt={comic.title} />
                            <p>{comic.title}</p>
                        </section>
                    ))}
                </section>
            </section>

            <footer className="c-character-detail-footer" />
        </section>
    );
};
