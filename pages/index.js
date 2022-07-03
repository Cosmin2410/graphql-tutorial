import { useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import {
  Heading,
  Box,
  Flex,
  Input,
  Stack,
  IconButton,
  useToast,
} from '@chakra-ui/react';

import Characters from '../components/Characters';

export default function Home(results) {
  const initialState = results;
  const [characters, setCharacters] = useState(initialState.characters);

  return (
    <Flex direction="column" justify="center" align="center">
      <div>
        <h1 style={{ textAlign: 'center' }}>GraphQL Tutorial</h1>
      </div>
      <Box mb={4} flexDirection="column" align="center" justify="center" py={8}>
        <Heading as="h1" size="2x1" mb={8}>
          Rick and Morty
        </Heading>
        <Characters characters={characters} />
      </Box>
    </Flex>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql/',
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query {
        characters(page: 1) {
          info {
            count
            pages
          }
          results {
            name
            id
            location {
              id
              name
            }
            origin {
              id
              name
            }
            episode {
              id
              episode
              air_date
            }
            image
          }
        }
      }
    `,
  });

  return {
    props: {
      characters: data.characters.results,
    },
  };
}
