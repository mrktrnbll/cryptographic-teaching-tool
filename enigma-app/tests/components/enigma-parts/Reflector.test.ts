import { reflectLetter } from 'src/components/engima-parts/Reflector';

describe('runThroughReflector', () => {
    test('A - should be D', () => {
        expect(reflectLetter('A')).toBe('D');
    });
    test('C - should be M', () => {
        expect(reflectLetter('C')).toBe('M');
    });
    test('Z - should be Y', () => {
        expect(reflectLetter('Z')).toBe('Y');
    });
    test('S - should be Q', () => {
        expect(reflectLetter('S')).toBe('Q');
    });
    test('M - should be C', () => {
        expect(reflectLetter('M')).toBe('C');
    });
    test('K - should be G', () => {
        expect(reflectLetter('K')).toBe('G');
    });
    test('Q - should be S', () => {
        expect(reflectLetter('Q')).toBe('S');
    });
    test('2 - should be Not Alphabetical', () => {
        expect(reflectLetter('2')).toBe('Not Alphabetical');
    });
});