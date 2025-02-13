import { runLetterThroughPlugboard } from 'src/components/engima-parts/Plugboard';

describe('runLetterThroughPlugboard', () => {
    test('[A] - should be N', () => {
        expect(runLetterThroughPlugboard('A')).toBe('N');
    });
    test('C - should be P', () => {
        expect(runLetterThroughPlugboard('C')).toBe('P');
    });
    test('T - should be G', () => {
        expect(runLetterThroughPlugboard('T')).toBe('G');
    });
    test('S - should be F', () => {
        expect(runLetterThroughPlugboard('S')).toBe('F');
    });
    test('M - should be Z', () => {
        expect(runLetterThroughPlugboard('M')).toBe('Z');
    });
    test('K - should be X', () => {
        expect(runLetterThroughPlugboard('K')).toBe('X');
    });
    test('Z - should be M', () => {
        expect(runLetterThroughPlugboard('Z')).toBe('M');
    });
    test('2 - should be Not Alphabetical', () => {
        expect(runLetterThroughPlugboard('2')).toBe('Not Alphabetical');
    });
});