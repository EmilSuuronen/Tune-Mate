import { gql } from '@apollo/client';

const CREATE_TAB = gql`
    mutation CreateTab($input: TabInput!) {
        createTab(input: $input) {
            id
            name
            tempo
            string1
            string2
            string3
            string4
            string5
            string6
            owner
        }
    }
`;

const FIND_TAB_BY_USER = gql`
    query FindTabsByOwner($input: FindTabsByOwnerInput!) {
        findTabsByOwner(input: $input) {
            id
        }
    }
`;

export { CREATE_TAB, FIND_TAB_BY_USER };
