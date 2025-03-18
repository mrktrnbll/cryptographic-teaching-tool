import {ROTOR_PAIRINGS, NOTCHES, ALPHABET} from "./Variables";

export const printRotors: () => void = () => {
    console.log(ROTOR_PAIRINGS, NOTCHES);
}

export class Rotor {
    rotorNum: string;
    wiring: Record<string, string>;
    notch: string;
    window: string;
    offset: number;
    nextRotor?: Rotor;
    previousRotor?: Rotor;

    constructor(rotorNum: string, windowLetter: string, nextRotor?: Rotor, previousRotor?: Rotor) {
        this.rotorNum = rotorNum;
        this.wiring = ROTOR_PAIRINGS[rotorNum];
        this.notch = NOTCHES[rotorNum];
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

    public updatePosition(newValue: number) {
        this.window = String.fromCharCode(65 + (newValue-1 % 26));
        this.offset = newValue-1;
    } // should definetly test this method

    rotate(): void {
        if (this.nextRotor && this.window === this.notch) {
            console.log(this.rotorNum, this.window, this.notch, "before rotate");
            this.nextRotor.rotate();
            console.log(this.rotorNum, this.window, this.notch, "after rotate");
        }
        this.offset = (this.offset + 1) % 26;
        this.window = ALPHABET[this.offset];
    }

    runLetterThroughRotor(
        index: string | number,
        forward: boolean = true,
        letterReturn: boolean = false
    ): string {
        if (typeof index === "string" && index.length === 1) {
            index = ALPHABET.indexOf(index.toUpperCase());
        }
        const key= forward ? "forward" : "backward";

        const wiring: string = this.wiring[key];
        const outputLetter = wiring.charAt((Number(index) + this.offset) % 26);
        const outputIndex = ((ALPHABET.indexOf(outputLetter) - this.offset) % 26 + 26) % 26;

        if (letterReturn) {
            return ALPHABET[outputIndex];
        } else if (this.nextRotor && forward) {
            return this.nextRotor.runLetterThroughRotor(outputIndex, forward);
        } else if (this.previousRotor && !forward) {
            return this.previousRotor.runLetterThroughRotor(outputIndex, forward);
        } else {
            return ALPHABET[outputIndex];
        }
    }

    invertWiring(forwardWiring: string): string {
        const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const backward = Array(26).fill("");
        for (let i = 0; i < 26; i++) {
            const letter = forwardWiring.charAt(i);
            const pos = ALPHABET.indexOf(letter);
            backward[pos] = ALPHABET[i];
        }
        return backward.join("");
    }
}
