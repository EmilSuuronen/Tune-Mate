import {gql} from '@apollo/client';

const CREATE_TUNING = gql`
    mutation CreateTuning($input: TuningInput!) {
        createTuning(input: $input) {
            id
            name
            string_count
            string_notes
            owner
        }
    }
`;

const FIND_TUNING_BY_USER = gql`
    query FindTuningsByOwner($input: FindTuningByOwnerInput!) {
        findTuningsByOwner(input: $input) {
            id
            name
            string_count
            string_notes
            owner
        }
    }
`;

const FIND_TUNING_BY_ID = gql`
    query FindTabById($input: FindTuningByIdInput!) {
        findTuningById(input: $input) {
            id
            name
            string_count
            string_notes
            owner
        }
    }
`;

const MODIFY_TUNING = gql`
    mutation ModifyTab ($id: ID!, $input: TuningInput!) {
        modifyTuning(id: $id, input: $input) {
            id
            name
            string_count
            string_notes
            owner
        }
    }
`;

const DELETE_TUNING = gql`
    mutation DeleteTuning($id: ID!) {
        deleteTuning(id: $id) {
            id
        }
    }
`;

export {CREATE_TUNING, FIND_TUNING_BY_USER, FIND_TUNING_BY_ID, MODIFY_TUNING, DELETE_TUNING};
