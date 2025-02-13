import {PLUGBOARD_SETTINGS, REFLECTOR} from "./Variables";


export const printPlugboardSettings: () => void = () => {
    console.log(PLUGBOARD_SETTINGS);
}

export const runLetterThroughPlugboard: (letter: string) => string = (letter: string) => {
    if (PLUGBOARD_SETTINGS.forward.includes(letter)) {
        return PLUGBOARD_SETTINGS.backward.charAt(PLUGBOARD_SETTINGS.forward.indexOf(letter));
    } else if (PLUGBOARD_SETTINGS.backward.includes(letter)) {
        return PLUGBOARD_SETTINGS.forward.charAt(PLUGBOARD_SETTINGS.backward.indexOf(letter));
    } else {
        return "Not Alphabetical";
    }
}

// TODO:
//  - add way to set plugboard settings
//  - test runLetterThroughPlugboard(), refactored so works similar as Reflector passthrough funciton
