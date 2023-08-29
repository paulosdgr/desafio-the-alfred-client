import { gql } from '@apollo/client';

export const GET_HEROES = gql`
    query Query($limit: Int, $offset: Int, $orderByName: Boolean, $search: String) {
        getCharacters(limit: $limit, offset: $offset, orderByName: $orderByName, search: $search) {
            id
            name
            thumbnail {
                extension
                path
            }
        }
    }
`;

export const GET_HERO_BY_ID = gql`
    query Query($id: Int!) {
        getCharacterById(id: $id) {
            id
            name
            description
            thumbnail {
                path
                extension
            }
            comics {
                id
                title
                images {
                    path
                    extension
                }
            }
        }
    }
`;
