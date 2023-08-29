import React, { useEffect, useState } from 'react';
import HeroIcon from '../../assets/icons/hero.svg';
import Logo from '../../assets/images/logo.png';
import { Checkbox } from '../../shared/checkbox/checkbox';
import { Search } from '../../shared/search/search';
import { Switch } from '../../shared/switch/switch';

import { useQuery } from '@apollo/client';
import { Hero, HeroResponse } from '../../models';
import { GET_HEROES } from '../../queries/queries';
import './characters.scss';
import { HeroCard } from './components/hero-card/hero-card';
export const Characters: React.FC = () => {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const [orderByName, setOrderByName] = useState<boolean>(false);
    const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [offset, setOffset] = useState<number>(0);

    const { loading, data } = useQuery(GET_HEROES, {
        variables: {
            orderByName: orderByName,
            search: search,
            offset: offset,
        },
    });

    useEffect(() => {
        if (data) {
            setHeroes(mapHeroes(data?.getCharacters ?? ([] as HeroResponse[])));
        }
    }, [data]);

    useEffect(() => {
        onlyFavorites ? setFavorites() : setHeroes(mapHeroes(data?.getCharacters ?? ([] as HeroResponse[])));
    }, [data?.getCharacters, onlyFavorites]);

    const handleNextPage = () => {
        setOffset(offset + 20);
    };

    const handlePreviousPage = () => {
        if (offset > 0) {
            setOffset(offset - 20);
        }
    };

    const setFavorites = () => {
        const favorites = JSON.parse(localStorage.getItem('heroesFavorited') || '[]');
        setHeroes(favorites as Hero[]);
    };
    const mapHeroes = (heroes: HeroResponse[]): Hero[] =>
        heroes.map(
            (hero) =>
                ({
                    id: hero.id,
                    name: hero.name,
                    image: `${hero.thumbnail.path}.${hero.thumbnail.extension}`,
                }) as Hero,
        );

    const handleOrderByName = () => {
        if (loading) {
            return;
        }

        setOrderByName(!orderByName);
    };

    const navigateToHeroDetails = (id: number) => {
        window.location.href = `/characters/${id}`;
    };

    return (
        <section className="c-characters-container">
            <header className="c-characters-header">
                <img src={Logo} className="c-characters-header__logo" alt="Logo" />
                <h1 className="c-characters-header__title">EXPLORE O UNIVERSO</h1>
                <p className="c-characters-header__text">
                    Mergulhe no domínio deslumbrande de todos os personagens clássicos que você ama - e aqueles que você
                    descobrirá em breve!
                </p>
                <Search style="red" placeholder="Procure por heróis" onSearch={(value) => setSearch(value)} />
            </header>

            <section className="c-characters-filter">
                <section className="c-characters-filter__left">
                    <p>Encontrado 20 herois</p>
                </section>

                <section className="c-characters-filter__right">
                    <div className="c-characters-filter__container">
                        <img src={HeroIcon} alt="Hero" className="-c-characters-filter__icon" />
                        <p>Ordernar por nome - A/Z</p>
                        <Switch checked={orderByName} onChange={handleOrderByName} />
                    </div>
                    <div className="c-characters-filter__container">
                        <Checkbox checked={onlyFavorites} onChange={() => setOnlyFavorites(!onlyFavorites)} />
                        <p>Somente favoritos</p>
                    </div>
                </section>
            </section>

            <section className="c-characters-grid">
                {heroes.map((hero) => (
                    <HeroCard
                        onClick={() => navigateToHeroDetails(hero.id)}
                        name={hero.name}
                        id={hero.id}
                        imageUrl={hero.image}
                        key={hero.id}
                    />
                ))}
            </section>

            <footer className="c-characters-footer">
                <button onClick={handlePreviousPage} className="c-characters-footer__button">
                    Voltar Pagina
                </button>
                <button onClick={handleNextPage} className="c-characters-footer__button">
                    Avançar Pagina
                </button>
            </footer>
        </section>
    );
};
