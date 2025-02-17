import {PLUGBOARD_SETTINGS} from "./Variables";


export const printPlugboardSettings: () => void = () => {
    console.log(PLUGBOARD_SETTINGS);
}

export class Plugboard {
    plugboardSettings;

    constructor(plugboardSettings) {
        this.plugboardSettings = plugboardSettings;
    }

    runLetterThroughPlugboard(letter: string) {
        if (this.plugboardSettings.forward.includes(letter)) {
            return this.plugboardSettings.backward.charAt(this.plugboardSettings.forward.indexOf(letter));
        } else if (this.plugboardSettings.backward.includes(letter)) {
            return this.plugboardSettings.forward.charAt(this.plugboardSettings.backward.indexOf(letter));
        } else {
            return letter;
        }
    }

    changePlugboardSettings(from: string, to: string){
        this.plugboardSettings.forward = from;
        this.plugboardSettings.backward = to;
    }
}
