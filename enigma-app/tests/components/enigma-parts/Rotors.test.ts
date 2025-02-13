import { Rotor } from "src/components/engima-parts/Rotors";

const Rotor1: Rotor = new Rotor("1", "A");
const Rotor2: Rotor = new Rotor("2", "A");
const Rotor3: Rotor = new Rotor("3", "A");
const Rotor4: Rotor = new Rotor("4", "A");
const Rotor5: Rotor = new Rotor("5", "A");

describe('runThroughRotor', () => {
    test('A - should be I', () => {
        expect(Rotor1.runLetterThroughRotor('A', true)).toBe('I');
    });
    test('S - should be U', () => {
        expect(Rotor2.runLetterThroughRotor('S', false)).toBe('U');
    });
});