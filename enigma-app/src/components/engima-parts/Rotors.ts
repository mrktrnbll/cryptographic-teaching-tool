import {ROTOR_PAIRINGS, NOTCHES, ALPHABET} from "src/components/engima-parts/Variables";

export const printRotors: () => void = () => {
    console.log(ROTOR_PAIRINGS, NOTCHES);
}

export class Rotor {
    rotorNum: string;
    wiring: object;
    notch: string;
    window: string;
    offset: number;
    nextRotor?: Rotor;
    previousRotor?: Rotor;

    constructor(rotorNum: string, windowLetter: string, nextRotor?: Rotor, previousRotor?: Rotor) {
        // In the original Python code only certain rotor numbers were allowed.
        // Here we check if the rotor number is one of the keys in ROTOR_PAIRINGS.
        if (!["1", "2", "3", "4", "5"].includes(rotorNum)) {
            console.error(
                "Please select a valid rotor number (1, 2, 3, 4, or 5) and provide the initial window setting (i.e. the letter on the wheel initially visible to the operator)."
            );
            throw new Error("Invalid rotor number");
        }
        this.rotorNum = rotorNum;
        this.wiring = ROTOR_PAIRINGS[rotorNum];
        this.notch = NOTCHES[rotorNum];
        // The window letter defines the initial setting.
        this.window = windowLetter.toUpperCase();
        this.offset = ALPHABET.indexOf(this.window);
        this.nextRotor = nextRotor;
        this.previousRotor = previousRotor;
    }

    setNextRotor(nextRotor: Rotor): void {
        this.nextRotor = nextRotor;
    }

    setPreviousRotor(previousRotor: Rotor): void {
        this.previousRotor = previousRotor;
    }

    rotate(): void {
        // If there is a next rotor and the current rotor's window matches the notch,
        // trigger the next rotor to step.
        if (this.nextRotor && this.window === this.notch) {
            console.log(this.rotorNum, this.window, this.notch, "before rotate");
            this.nextRotor.rotate();
            console.log(this.rotorNum, this.window, this.notch, "after rotate");
        }
        // Step the rotor by incrementing the offset, ensuring wrap-around using modulo arithmetic.
        this.offset = (this.offset + 1) % 26;
        this.window = ALPHABET[this.offset];
    }

    runLetterThroughRotor(
        index: string | number,
        forward: boolean = true,
        printit: boolean = false
    ): string {
        // If the input is a single letter, convert it to its corresponding index.
        if (typeof index === "string" && index.length === 1) {
            index = ALPHABET.indexOf(index.toUpperCase());
        }
        const key= forward ? "forward" : "backward";
        // Get the output letter from the wiring table.
        // Use modulo arithmetic (with adjustment to handle negative numbers) to ensure indices are between 0 and 25.

        const outputLetter = this.wiring[key].charAt((Number(index) + this.offset) % 26);
        // console.log("outputLetter", outputLetter);
        // Calculate the output index by reversing the offset.
        const outputIndex = ((ALPHABET.indexOf(outputLetter) - this.offset) % 26 + 26) % 26;
        // console.log("outputIndex", outputIndex);

        if (printit) {
            console.log(
                `Rotor ${this.rotorNum}: input = ${ALPHABET[((this.offset + Number(index)) % 26 + 26) % 26]}, output = ${outputLetter}`
            );
        }

        // Cascade the encoding through the rotor chain if applicable.
        if (this.nextRotor && forward) {
            return this.nextRotor.runLetterThroughRotor(outputIndex, forward);
        } else if (this.previousRotor && !forward) {
            return this.previousRotor.runLetterThroughRotor(outputIndex, forward);
        } else {
            return ALPHABET[outputIndex];
        }
    }

    invertWiring(forwardWiring: string): string {
        const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let backward = Array(26).fill("");
        for (let i = 0; i < 26; i++) {
            const letter = forwardWiring.charAt(i);
            const pos = ALPHABET.indexOf(letter);
            backward[pos] = ALPHABET[i];
        }
        return backward.join("");
    }
}
