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

    constructor(rotorID: string, rotorNumber: string, nextRotor: Rotor | null, previousRotor: Rotor | null) {
        this.rotorID = rotorID;
        this.rotorNumber = rotorNumber;
        this.nextRotor = nextRotor;
        this.previousRotor = previousRotor;
        this.changeNextRotor = NOTCHES[rotorID];
    }

    rotate(): void {
        if (this.nextRotor && this.rotorNumber==this.changeNextRotor) {
            console.log("step");
            this.nextRotor.rotate();
        }
        this.rotorNumber = ALPHABET.charAt((ALPHABET.indexOf(this.rotorNumber) + 1) % 26);
        console.log(this.rotorNumber);
    }
}