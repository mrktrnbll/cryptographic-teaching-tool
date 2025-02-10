import {PLUGBOARD_SETTINGS, REFLECTOR} from "./Variables";


export const printPlugboardSettings: () => void = () => {
    console.log(PLUGBOARD_SETTINGS);
}

export const runLetterThroughPlugboard: (letter: string) => string = (letter: string) => {
    if (PLUGBOARD_SETTINGS.forward.includes(letter)) {
        return REFLECTOR.backward.charAt(REFLECTOR.forward.indexOf(letter));
    } else if (PLUGBOARD_SETTINGS.backward.includes(letter)) {
        return REFLECTOR.forward.charAt(REFLECTOR.backward.indexOf(letter));
    } else {
        return letter;
    }
}

// TODO:
//  - add way to set plugboard settings
//  - test runLetterThroughPlugboard(), refactored so works similar as Reflector passthrough funciton


console.log(runLetterThroughPlugboard("A", true)) // "tested" and works