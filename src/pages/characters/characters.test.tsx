import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import { FavoritesProvider } from '../../contexts/favorite-context';
import { GET_HEROES } from '../../queries/queries';
import { Characters } from './characters';

const mocks = [
    {
        request: {
            query: GET_HEROES,
            variables: {
                orderByName: false,
                search: '',
                offset: 0,
            },
        },
        result: {
            data: {
                getCharacters: [
                    {
                        id: '1',
                        name: 'Spider-Man',
                        thumbnail: {
                            path: 'spiderman',
                            extension: 'jpg',
                        },
                    },
                    {
                        id: '2',
                        name: 'Iron Man',
                        thumbnail: {
                            path: 'spiderman',
                            extension: 'jpg',
                        },
                    },
                ],
            },
        },
    },
];

describe('Characters', () => {
    it('renders the header and search bar', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <FavoritesProvider>
                    <Characters />
                </FavoritesProvider>
            </MockedProvider>,
        );

        expect(screen.getByText('EXPLORE O UNIVERSO')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Procure por heróis')).toBeInTheDocument();
    });

    it('renders the hero cards', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <FavoritesProvider>
                    <Characters />
                </FavoritesProvider>
            </MockedProvider>,
        );

        await screen.findByText('Spider-Man');
        expect(screen.getByText('Spider-Man')).toBeInTheDocument();
        expect(screen.getByText('Iron Man')).toBeInTheDocument();
    });
});
