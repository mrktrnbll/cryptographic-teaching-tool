export const ROTOR_PAIRINGS: Record<string, Record<string,string>> = {
    "1": { "forward": "ATQSWERDFYGZUCHXVJLIOPKMNB", "backward": "IQWHLAXJUFPCVMYNDKOSBZRGTE" },
    "2": { "forward": "MJUIOKPLNAZVXCBSDGFHYQTWER", "backward": "FASPZKIUYEOJWXQLVBMGRHCDTN" },
    "3": { "forward": "ABZXVSCWQREFDLMYTUIGJPOKHN", 'backward': "WYCZKXTDGAQNBOIMLUVRJPHESF" },
    "4": { "forward": "TSBYQINHFZJRUPELAWXKGDOMCV", "backward": "DZGBHWTYPFSEKLNRUVOJCMQAXI" },
    "5": { "forward": "KHCDUFYSAINXZMRPGTEBOVQJWL", "backward": "ORGMKSJCVIUXNLZQWBYTAPHFDE" },
};

export const NOTCHES: Record<string, string> = {
    "1": "M",
    "2": "A",
    "3": "R",
    "4": "K",
    "5": "T",
} // hehe

export const REFLECTOR = {
    "forward": "MARKTUNBLQWEY", // hehe
    "backward": "CDFGHIJOPSVXZ",
}

export const PLUGBOARD_SETTINGS = {
    "forward": "ABCDEFGHIJKLM",
    "backward": "NOPQRSTUVWXYZ",
} // default setting - empty plugboard (no connections)

export const ALPHABET: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
