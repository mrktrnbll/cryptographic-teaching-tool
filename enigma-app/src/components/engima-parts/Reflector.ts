import {REFLECTOR} from "./Variables";

export const printReflector: () => void = () => {
    console.log(REFLECTOR);
}

export const reflectLetter: (letter: string) => string = (letter) => {
    if (REFLECTOR.forward.includes(letter)) {
        return REFLECTOR.backward.charAt(REFLECTOR.forward.indexOf(letter));
    } else if (REFLECTOR.backward.includes(letter)) {
        return REFLECTOR.forward.charAt(REFLECTOR.backward.indexOf(letter));
    } else {
        return 'Not Alphabetical';
    }
}