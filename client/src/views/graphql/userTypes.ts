import { gql } from '@apollo/client';

const CREATE_USER = gql`
    mutation CreateUser($input: UserInput!) {
        createUser(input: $input) {
            id
            user_name
            email
        }
    }
`;

const LOGIN_USER = gql`
    mutation LoginUser($input: LoginInput!) {
        loginUser(input: $input) {
            token
            user {
                id
                user_name
            }
        }
    }
`;

export { CREATE_USER, LOGIN_USER };
