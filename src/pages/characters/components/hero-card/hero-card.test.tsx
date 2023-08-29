import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { FavoritesProvider } from '../../../../contexts/favorite-context';
import { Hero } from '../../../../models';
import { HeroCard } from './hero-card';
describe('HeroCard Component', () => {
    it('renders hero card with name and image', () => {
        const props = {
            name: 'Spider-Man',
            id: 1,
            image: 'spiderman.jpg',
        } as Hero;

        render(
            <FavoritesProvider>
                <HeroCard {...props} imageUrl={props.image} />
            </FavoritesProvider>,
        );

        const nameElement = screen.getByText(props.name);
        const imageElement = screen.getByAltText(props.name);

        expect(nameElement).toBeInTheDocument();
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', props.image);
    });
});
