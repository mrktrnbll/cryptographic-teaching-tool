import { Rotor } from "src/components/engima-parts/Rotors";
import { EnigmaMachine } from "src/components/engima-parts/enigmaMachine";

function createEnigmaMachine(
    rotor1Setting: string,
    rotor2Setting: string,
    rotor3Setting: string
): EnigmaMachine {
    const rotor1 = new Rotor("1", rotor1Setting);
    const rotor2 = new Rotor("2", rotor2Setting);
    const rotor3 = new Rotor("3", rotor3Setting);
    rotor1.setNextRotor(rotor2);
    rotor2.setNextRotor(rotor3);
    rotor2.setPreviousRotor(rotor1);
    rotor3.setPreviousRotor(rotor2);
    return new EnigmaMachine([rotor1, rotor2, rotor3]);
}

describe('EnigmaMachine.runLetterThroughMachine (multiple characters)', () => {

    test('Encrypting then decrypting "HELLOWORLD" yields "HELLOWORLD"', () => {
        const plaintext = "HELLOWORLD";
        const enigmaMachine = createEnigmaMachine("A", "A", "A");

        let ciphertext = "";
        for (const char of plaintext) {
            ciphertext += enigmaMachine.runLetterThroughMachine(char);
        }

        const decryptionMachine = createEnigmaMachine("A", "A", "A");
        let decrypted = "";
        for (const char of ciphertext) {
            decrypted += decryptionMachine.runLetterThroughMachine(char);
        }

        expect(decrypted).toBe(plaintext);
    });

    test('Encrypting "TESTMESSAGE" yields ciphertext different from plaintext', () => {
        const plaintext = "TESTMESSAGE";
        const enigmaMachine = createEnigmaMachine("A", "A", "A");

        let ciphertext = "";
        for (const char of plaintext) {
            ciphertext += enigmaMachine.runLetterThroughMachine(char);
        }

        expect(ciphertext).not.toBe(plaintext);
    });

    test('Different rotor settings produce different ciphertexts for "ENIGMATEST"', () => {
        const plaintext = "ENIGMATEST";
        const machine1 = createEnigmaMachine("A", "B", "C");
        let ciphertext1 = "";
        for (const char of plaintext) {
            ciphertext1 += machine1.runLetterThroughMachine(char);
        }

        const machine2 = createEnigmaMachine("M", "C", "Z");
        let ciphertext2 = "";
        for (const char of plaintext) {
            ciphertext2 += machine2.runLetterThroughMachine(char);
        }

        expect(ciphertext1).not.toBe(ciphertext2);
    });

    test('Reciprocal for long message: "THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG"', () => {
        const plaintext = "THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG";
        const enigmaMachine = createEnigmaMachine("A", "A", "A");

        let ciphertext = "";
        for (const char of plaintext) {
            ciphertext += enigmaMachine.runLetterThroughMachine(char);
        }

        const decryptionMachine = createEnigmaMachine("A", "A", "A");
        let decrypted = "";
        for (const char of ciphertext) {
            decrypted += decryptionMachine.runLetterThroughMachine(char);
        }

        expect(decrypted).toBe(plaintext);
    });

    test('Repeated encryption of letter "A" with one machine produces different ciphertext letters', () => {
        const enigmaMachine = createEnigmaMachine("A", "A", "A");
        const outputs: string[] = [];
        const repetitions = 10;
        for (let i = 0; i < repetitions; i++) {
            outputs.push(enigmaMachine.runLetterThroughMachine("A"));
        }
        const uniqueOutputs = new Set(outputs);
        expect(uniqueOutputs.size).toBeGreaterThan(1);
    });

    test('Mixed-case input "ENIGMATEST" decrypts to uppercase "ENIGMATEST"', () => {
        const plaintext = "ENIGMATEST";
        const enigmaMachine = createEnigmaMachine("A", "A", "A");
        let ciphertext = "";
        for (const char of plaintext) {
            ciphertext += enigmaMachine.runLetterThroughMachine(char);
        }
        const decryptionMachine = createEnigmaMachine("A", "A", "A");
        let decrypted = "";
        for (const char of ciphertext) {
            decrypted += decryptionMachine.runLetterThroughMachine(char);
        }
        expect(decrypted).toBe(plaintext.toUpperCase());
    });

});
