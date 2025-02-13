import {ROTOR_PAIRINGS, NOTCHES, ALPHABET} from "src/components/engima-parts/Variables";

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
            console.log(this.nextRotor, this.rotorNumber, this.changeNextRotor);
            this.nextRotor.rotate();
        }
        const indexOfRotorNumber: number = ROTOR_PAIRINGS[this.rotorID]['forward'].indexOf(this.rotorNumber);
        this.rotorNumber = ROTOR_PAIRINGS[this.rotorID]['forward'].charAt((indexOfRotorNumber + 1) % 26);
    }

    runLetterThroughRotor(letter: string, forwardDirection: boolean): string {
        let direction: string;
        let backDirection: string;

        if (forwardDirection) {
            direction = "forward";
            backDirection = "backward";
        } else {
            direction = "backward";
            backDirection = "forward";
        }

        const indexOfRotorNumber: number = ROTOR_PAIRINGS[this.rotorID][direction].indexOf(this.rotorNumber);
        console.log(indexOfRotorNumber, this.rotorNumber);
        const letterForward = ROTOR_PAIRINGS[this.rotorID][direction];
        const index: number = letterForward.indexOf(letter);
        const output = ROTOR_PAIRINGS[this.rotorID][backDirection].charAt(index);


        if (this.nextRotor !== null && forwardDirection) {
            return this.nextRotor.runLetterThroughRotor(output, forwardDirection);
        } else if (this.previousRotor !== null && !forwardDirection) {
            return this.previousRotor.runLetterThroughRotor(output, forwardDirection);
        } else {
            return output;
        }
    }
}