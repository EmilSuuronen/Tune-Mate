import{ gql } from 'apollo-server-express';

const typeDefs = gql`
    type Query {
        getUserById: String
    }
`;

module.exports = typeDefs;
