import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FavoritesProvider, useFavorites } from './favorite-context';

describe('FavoritesContext', () => {
    it('adds and removes favorites correctly', async () => {
        const TestComponent = () => {
            const { addFavorite, removeFavorite, isFavorite } = useFavorites();

            return (
                <div>
                    <button onClick={() => addFavorite({ id: 1, name: 'Hero 1', image: 'image1.jpg' })}>
                        Adicionar
                    </button>
                    <button onClick={() => removeFavorite(1)}>Remover</button>
                    <p data-testid="is-favorite">{isFavorite(1).toString()}</p>
                </div>
            );
        };

        render(
            <FavoritesProvider>
                <TestComponent />
            </FavoritesProvider>,
        );

        const addFavoriteButton = screen.getByText('Adicionar');
        const removeFavoriteButton = screen.getByText('Remover');
        const isFavoriteText = screen.getByTestId('is-favorite');

        fireEvent.click(addFavoriteButton);
        await waitFor(() => {
            expect(isFavoriteText.textContent).toBe('true');
        });

        fireEvent.click(removeFavoriteButton);
        await waitFor(() => {
            expect(isFavoriteText.textContent).toBe('false');
        });
    });
});
