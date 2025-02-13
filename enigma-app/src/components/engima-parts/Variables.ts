export const ROTOR_PAIRINGS: Record<string, Record<string,string>> = {
    '1': { "forward": "EKMFLGDQVZNTOWYHXUSPAIBRCJ", "backward": "UWYGADFPVZBECKMTHXSLRINQOJ"},
    '2': { "forward": "AJDKSIRUXBLHWTMCQGZNPYFVOE", "backward": "AJPCZWRLFBDKOTYUQGENHXMIVS"},
    '3': { "forward": "BDFHJLCPRTXVZNYEIWGAKMUSQO", "backward": "TAGBPCSDQEUFVNZHYIXJWLRKOM"},
    "4": { "forward": "ESOVPZJAYQUIRHXLNFTGKDCMWB", "backward": "HZWVARTNLGUPXQCEJMBSKDYOIF" },
    "5": { "forward": "VZBRGITYUPSDNHLXAWMJQOFECK", "backward": "QCYLXWENFTZOSMVJUDKGIARPHB" },
}; // historically accurate rotor settings

export const NOTCHES: Record<string, string> = {
    "1": "Q",
    "2": "E",
    "3": "V",
    "4": "J",
    "5": "Z",
}

export const REFLECTOR = {
    "forward": "MARKTUNBLQWEY", // hehe
    "backward": "CDFGHIJOPSVXZ",
}

//// comment out the above and uncomment the below for historically accurate reflector settings
// export const REFLECTOR = {
//     forward: "ABCDEFGIJKMTV",
//     backward: "YRUHQSLPXNOZW",
// } // historically accurate reflector settings

export const PLUGBOARD_SETTINGS = {
    "forward": "ABCDEFGHIJKLM",
    "backward": "NOPQRSTUVWXYZ",
} // default setting - empty plugboard (no connections)

export const ALPHABET: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
