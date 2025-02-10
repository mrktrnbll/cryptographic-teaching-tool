import {REFLECTOR} from "@/components/engima-parts/Variables";

export const printReflector: () => void = () => {
    console.log(REFLECTOR);
}

export const reflectLetter: (letter: string) => string = (letter) => {
    if (REFLECTOR.forward.includes(letter)) {
        return REFLECTOR.backward.charAt(REFLECTOR.forward.indexOf(letter));
    } else {
        return REFLECTOR.forward.charAt(REFLECTOR.backward.indexOf(letter));
    }
}