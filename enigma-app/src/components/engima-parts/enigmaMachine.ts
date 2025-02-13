import {runLetterThroughPlugboard} from "@/components/engima-parts/Plugboard";
import {reflectLetter} from "@/components/engima-parts/Reflector";
import {Rotor} from "@/components/engima-parts/Rotors";


export class EnigmaMachine {
    rotors: Rotor[];

    constructor(rotors: Rotor[]) {
        this.rotors = rotors;
    }

    rotateRotors(): void {
        this.rotors[0].rotate();
    }

    runLetterThroughMachine(letter: string): string {
        this.rotateRotors();

        const letterAfterPlugboard: string = runLetterThroughPlugboard(letter);
        // console.log("letter after plugboard", letterAfterPlugboard);
        const letterAfterRotors: string = this.rotors[0].runLetterThroughRotor(letterAfterPlugboard, true);
        // console.log("letter after rotors", letterAfterRotors);
        const letterAfterReflector: string = reflectLetter(letterAfterRotors);
        // console.log("letter after reflector", letterAfterReflector);
        const letterAfterRotorsBackward: string = this.rotors[2].runLetterThroughRotor(letterAfterReflector, false);
        // console.log("letter after rotors backward", letterAfterRotorsBackward);
        const letterAfterPlugboardBackward: string = runLetterThroughPlugboard(letterAfterRotorsBackward);
        // console.log("letter after plugboard backward", letterAfterPlugboardBackward);
        return letterAfterPlugboardBackward
    } // if this works imma crazy
}

export const doTestThing = () => {
    const rotor1: Rotor = new Rotor("1", "C");
    const rotor2: Rotor = new Rotor("2", "C");
    const rotor3: Rotor = new Rotor("3", "Z");
    rotor1.setNextRotor(rotor2);
    rotor2.setNextRotor(rotor3);

    rotor2.setPreviousRotor(rotor1);
    rotor3.setPreviousRotor(rotor2);

    const enigmaMachine = new EnigmaMachine([rotor1, rotor2, rotor3]);

    console.log(enigmaMachine.runLetterThroughMachine("M"));
    console.log(enigmaMachine.runLetterThroughMachine("O"));
    console.log(enigmaMachine.runLetterThroughMachine("L"));

    console.log(rotor1.invertWiring("ESOVPZJAYQUIRHXLNFTGKDCMWB"));
    console.log(rotor1.invertWiring("VZBRGITYUPSDNHLXAWMJQOFECK"));
}