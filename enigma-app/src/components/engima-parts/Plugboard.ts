import {PLUGBOARD_SETTINGS} from "./Variables";


export const printPlugboardSettings: () => void = () => {
    console.log(PLUGBOARD_SETTINGS);
}

export const runLetterThroughPlugboard: (letter: string, forwardDirection: boolean) => string = (letter, forwardDirection) => {
    if (forwardDirection) {
        return PLUGBOARD_SETTINGS.backward.charAt(PLUGBOARD_SETTINGS.forward.indexOf(letter));
    } else {
        return PLUGBOARD_SETTINGS.forward.charAt(PLUGBOARD_SETTINGS.backward.indexOf(letter));
    }
}

// TODO: add way to set plugboard settings

console.log(runLetterThroughPlugboard("A", true)) // "tested" and works