import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from '../contexts/favorite-context';
import { CharacterDetail } from '../pages/character-detail/character-detail';
import { Characters } from '../pages/characters/characters';
import './app.scss';

const client = new ApolloClient({
    uri: 'https://desafio-the-alfred-api-9b266563507e.herokuapp.com/',
    cache: new InMemoryCache(),
});

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/characters" />,
    },
    {
        path: '/characters',
        element: <Characters />,
    },
    {
        path: '/characters/:characterId',
        element: <CharacterDetail />,
    },
    {
        path: '*',
        element: <Navigate to="/characters" />,
    },
]);

function App() {
    return (
        <ApolloProvider client={client}>
            <FavoritesProvider>
                <RouterProvider router={router} />
            </FavoritesProvider>
        </ApolloProvider>
    );
}

export default App;
