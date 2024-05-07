
const TUNING_NOTES = [
    ["D#", "G#", "C#", "F#", "A#", "D#"],
    ["E", "A", "D", "G", "B", "E"],
    ["F", "A#", "D#", "G#", "C", "F"],
    ["F#", "B", "E", "A", "C#", "F#"],
    ["G", "C", "F", "A#", "D", "G"],
    ["G#", "C#", "F#", "B", "D#", "G#"],
    ["A", "D", "G", "C", "E", "A"],
    ["A#", "D#", "G#", "C#", "F", "A#"],
    ["B", "E", "A", "D", "F#", "B"],
    ["C", "F", "A#", "D#", "G", "C"],
    ["C#", "F#", "B", "E", "G#", "C#"],
    ["D", "G", "C", "F", "A", "D"],
    ["D#", "G#", "C#", "F#", "A#", "D#"]
];

interface TuningInput {
    name: string;
    string_count: number;
    string_notes: string[];
    owner: string;
}

export default TUNING_NOTES;
