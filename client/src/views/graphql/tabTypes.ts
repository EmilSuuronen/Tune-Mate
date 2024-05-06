import {gql} from '@apollo/client';

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

const FIND_TAB_BY_ID = gql`
    query FindTabById($input: FindTabsByIdInput!) {
        findTabById(input: $input) {
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

const MODIFY_TAB = gql`
    mutation ModifyTab ($id: ID!, $input: TabInput!) {
        modifyTab(id: $id, input: $input) {
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

const DELETE_TAB = gql`
    mutation DeleteTab($id: ID!) {
        deleteTab(id: $id) {
            id
        }
    }
`;

export {CREATE_TAB, FIND_TAB_BY_USER,FIND_TAB_BY_ID, MODIFY_TAB, DELETE_TAB};
