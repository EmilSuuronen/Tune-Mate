import { gql } from '@apollo/client';

const CREATE_TAB = gql`
    mutation CreateTab($input: TabInput!) {
        createTab(input: $input) {
            id
            tab_name
            tempo
            string1
            string2
            string3
            string4
            string5
            string6
        }
    }
`;

export { CREATE_TAB };