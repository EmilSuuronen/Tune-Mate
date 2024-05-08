export default class Tablature {
    strings: Record<number, string[]>;
    name: string = "";
    tempo: string = "";

    constructor() {
        this.strings = {};

        // Initialize each string with an array of 48 positions
        for (let i = 1; i <= 6; i++) {
            this.strings[i] = Array(48).fill(null);
        }
    }

    setNote(string: number, position: number, noteValue: string) {
        if (string < 1 || string > 6 || position < 0 || position > 47) {
            console.error("Invalid string or position value.");
            return;
        }
        this.strings[string][position] = noteValue;
    }

    getNote(string: number, position: number): string {
        if (string < 1 || string > 6 || position < 0 || position > 47) {
            console.error("Invalid string or position value.");
        }
        return this.strings[string][position];
    }

    setProperties(name: string, tempo: string) {
        this.name = name;
        this.tempo = tempo;
    }

    toString(): string {
        const stringNames = ["E", "A", "D", "G", "B", "e"];
        const barLength = 4;
        const lines: string[] = [];

        for (let i = 0; i < 6; i++) {
            const stringName = stringNames[i];
            const stringNotes = this.strings[i + 1];
            let line = `<span>${stringName}</span>|`;

            for (let barStart = 0; barStart < stringNotes.length; barStart += barLength) {
                const barNotes = stringNotes.slice(barStart, barStart + barLength);
                const barString = barNotes.map(note => {
                    const noteClass = (note === null || note === "") ? "-" : note;
                    const className = noteClass.length > 1 ? 'small' : 'regular';
                    return `<span class="${className}">${noteClass}</span>-`;
                }).flat()
                    .slice(0, barLength * 2 - 1)
                    .join("");

                line += `${barString}|`;
            }
            lines.push(line);
        }
        return lines.join("\n");
    }

}
