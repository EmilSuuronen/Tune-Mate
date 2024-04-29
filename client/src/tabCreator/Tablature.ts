export default class Note {
    strings: Record<number, string[]>; // Dictionary where keys are string numbers and values are arrays of notes.

    constructor() {
        this.strings = {};

        // Initialize each string with an array of 48 positions
        for (let i = 1; i <= 6; i++) { // Adjust for other instruments as needed.
            this.strings[i] = Array(48).fill(null);
        }
    }

    setNote(string: number, position: number, noteValue: string) {
        if (string < 1 || string > 6 || position < 0 || position > 127) {
            console.error("Invalid string or position value.");
            return;
        }
        this.strings[string][position] = noteValue;
    }

    getNote(string: number, position: number): string {
        if (string < 1 || string > 6 || position < 0 || position > 127) {
            console.error("Invalid string or position value.");
        }
        return this.strings[string][position];
    }

    toString(): string {
        const stringNames = ["E", "A", "D", "G", "B", "e"]; // Standard guitar tuning.
        const barLength = 4; // Number of notes per bar.

        // Initialize an array to store the formatted lines.
        const lines: string[] = [];

        for (let i = 0; i < 6; i++) {
            const stringName = stringNames[i];
            const stringNotes = this.strings[i + 1];

            // Create a string representation of each string's notes.
            let line = `${stringName}|`;

            // Split the notes into groups of 4 to form bars.
            for (let barStart = 0; barStart < stringNotes.length; barStart += barLength) {
                // Retrieve the notes for this bar.
                const barNotes = stringNotes.slice(barStart, barStart + barLength);

                // Create a string from these notes, alternating between notes and dashes.
                const barString = barNotes.map(note => (note === null || note === "" ? "-" : note))
                    .flatMap(note => [note, "-"]) // Alternate between note and dash.
                    .slice(0, barLength * 2 - 1) // Trim trailing dash.
                    .join("");

                line += `${barString}|`; // Add the bar to the line.
            }

            lines.push(line);
        }

        return lines.join("\n"); // Join all lines into a complete tablature.
    }

}
