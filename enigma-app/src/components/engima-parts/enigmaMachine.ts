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
        const letterAfterPlugboard: string = runLetterThroughPlugboard(letter);
        this.rotateRotors()
        const letterAfterRotors: string = this.rotors[0].runLetterThroughRotor(letterAfterPlugboard, true);
        const letterAfterReflector: string = reflectLetter(letterAfterRotors);
        const letterAfterRotorsBackward: string = this.rotors[2].runLetterThroughRotor(letterAfterReflector, false);
        return runLetterThroughPlugboard(letterAfterRotorsBackward);
    } // if this works imma crazy
}

export const doTestThing = () => {
    const rotor1: Rotor = new Rotor("1", "A");
    const rotor2: Rotor = new Rotor("2", "A");
    const rotor3: Rotor = new Rotor("3", "A");
    rotor1.setNextRotor(rotor2);
    rotor2.setNextRotor(rotor3);

    rotor2.setPreviousRotor(rotor1);
    rotor3.setPreviousRotor(rotor2);

    const rotor1_: Rotor = new Rotor("1", "A");
    const rotor2_: Rotor = new Rotor("2", "A");
    const rotor3_: Rotor = new Rotor("3", "A");
    rotor1_.setNextRotor(rotor2_);
    rotor2_.setNextRotor(rotor3_);

    rotor2_.setPreviousRotor(rotor1_);
    rotor3_.setPreviousRotor(rotor2_);

    const enigmaMachine = new EnigmaMachine([rotor1, rotor2, rotor3]);
    const enigmaMachineOutput = new EnigmaMachine([rotor1_, rotor2_, rotor3_]);

    console.log(enigmaMachine.runLetterThroughMachine("G") + " output of enigma machine");
    console.log("----------------")
    console.log(enigmaMachineOutput.runLetterThroughMachine("R") + " output of decryption");

    for (let i = 0; i < 26; i++) {
        console.log(enigmaMachine.runLetterThroughMachine("G") + " output of enigma machine");
    }
}