import {ROTOR_PAIRINGS, NOTCHES, ALPHABET} from "@/components/engima-parts/Variables";

export const printRotors: () => void = () => {
    console.log(ROTOR_PAIRINGS, NOTCHES);
}

export class Rotor {
    rotorID: string;
    rotorNumber: string;
    nextRotor: Rotor | null;
    previousRotor: Rotor | null;
    changeNextRotor: string;
    startingPosition: number;

    constructor(rotorID: string, rotorNumber: string) {
        this.rotorID = rotorID;
        this.rotorNumber = rotorNumber;
        this.nextRotor = null;
        this.previousRotor = null;
        this.changeNextRotor = NOTCHES[rotorID];
        this.startingPosition = ALPHABET.indexOf(this.changeNextRotor); // I think this is so wrong... meant to grab the value diff from the starting position - think its redundant
    }

    setNextRotor(nextRotor: Rotor): void {
        this.nextRotor = nextRotor;
    }

    setPreviousRotor(previousRotor: Rotor): void {
        this.previousRotor = previousRotor;
    }

    rotate(): void {
        if (this.nextRotor && this.rotorNumber==this.changeNextRotor) {
            console.log("step");
            this.nextRotor.rotate();
        }
        this.rotorNumber = ALPHABET.charAt((ALPHABET.indexOf(this.rotorNumber) + 1) % 26);
        console.log(this.rotorNumber + "rotor number");
    }

    runLetterThroughRotor(index: string, forwardDirection: boolean): string {
        let direction: string;
        const letter: number = ALPHABET.charAt(index);

        if (forwardDirection) {
            direction = "forward";
        } else {
            direction = "backward";
        }
        const output: string = ROTOR_PAIRINGS[this.rotorID][direction][(letter + this.startingPosition) % 26];

        const indexOfOutput: number = (ALPHABET.indexOf(output) - this.startingPosition)%26;

        if (this.nextRotor !== null && forwardDirection) {
            return this.nextRotor.runLetterThroughRotor(indexOfOutput, forwardDirection);
        } else if (this.previousRotor !== null && !forwardDirection) {
            return this.previousRotor.runLetterThroughRotor(indexOfOutput, forwardDirection);
        } else {
            return ALPHABET.charAt(indexOfOutput);
        }
    }
}