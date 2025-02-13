import { Rotor } from "src/components/engima-parts/Rotors";

const Rotor1: Rotor = new Rotor("1", "A");
const Rotor2: Rotor = new Rotor("2", "A");
const Rotor3: Rotor = new Rotor("3", "A");
const Rotor4: Rotor = new Rotor("4", "A");
const Rotor5: Rotor = new Rotor("5", "A");

describe('runThroughRotor', () => {
    test('Rotor1 (window "A") - Forward: "A" should be "I"', () => {
        expect(Rotor1.runLetterThroughRotor('A', true)).toBe('E');
    });

    test('Rotor2 (window "A") - Backward: "S" should be "E"', () => {
        expect(Rotor2.runLetterThroughRotor('S', false)).toBe('E');
    });

    test('Rotor1 with window "M" - Forward: "Z" should be "C"', () => {
        const rotor1M = new Rotor("1", "M");
        expect(rotor1M.runLetterThroughRotor('Z', true)).toBe('H');
    });

    test('Rotor3 with window "F" - Forward: "G" should be "Q"', () => {
        const rotor3F = new Rotor("3", "F");
        expect(rotor3F.runLetterThroughRotor('G', true)).toBe('Q');
    });

    test('Rotor4 with window "Z" - Backward: "B" should be "I"', () => {
        const rotor4Z = new Rotor("4", "Z");
        expect(rotor4Z.runLetterThroughRotor('B', false)).toBe('I');
    });

    test('Rotor5 with window "Q" - Forward: "M" should be "L"', () => {
        const rotor5Q = new Rotor("5", "Q");
        expect(rotor5Q.runLetterThroughRotor('M', true)).toBe('L');
    });
});
