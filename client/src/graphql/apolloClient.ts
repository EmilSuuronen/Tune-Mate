import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:3000/graphql',  // Adjust this URI to your GraphQL server URI
    }),
    cache: new InMemoryCache()
});

export default client;
