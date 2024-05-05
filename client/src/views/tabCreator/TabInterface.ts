export default interface Tab {
    __typename: string;
    id: string;
    name: string;
    tempo: number;
    string1: (string | null)[];
    string2: (string | null)[];
    string3: (string | null)[];
    string4: (string | null)[];
    string5: (string | null)[];
    string6: (string | null)[];
    owner: string;
}
