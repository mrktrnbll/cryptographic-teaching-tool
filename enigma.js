// how the enigma machine works...

// 1. keyboard takes input
// 2. letter input goes to "switch board"
    // - this is generally 10 manual defined letter matching.
    // - if input letter is matched then the changes to its matching pair.
    // - if not then it will remain the same.
// 3. 3 rotor settings
    // these are "pre-defined switch boards"
    // however after each keypress move by a single turn on the right most order
    // if the count - normal 26 - is exceeded then the left rotor will turn as well

    // a turn of the rotor of sets the letter pair by one - ie if matching was a-t then the next press of a will be a-u
    // NOTE above is for a single rotor matching this does not hold for all rotors output.
// 4. the reflector
    // the reflector is an unchangeable "switch board"
    // this is the same for all enigma machine of the same mk
    // it simply maps one letter to another and send that letter down the rotors in the reverse order
// 5. output
    // the encrypted letter is outputted.


// -----------------------------------
//         **implementation**
// -----------------------------------

// 1 keybaord input

let input = null;
let plugboardSettings = null

function stringInput(element) {
    if (event.key === 'Enter') {
        input = element.value;
        element.value = "";
    }
}

function buttonOnClick() {
    console.log(input);
}


// 2 switch board

function setPlugboard() {
    plugboardSettings = document.querySelectorAll('#pairings input');

    let lettersUsed = [];
    plugboardSettings.forEach((setting) => {
        // checks alphabetical and of len 2
        if (/^[a-zA-Z()]+$/.test(setting.value) && setting.value.length == 2) {
            console.log("yipe");
        }
        let letter1 = setting.value[0].toUpperCase();
        let letter2 = setting.value[1].toUpperCase();

        if (lettersUsed.length == 0) {
            lettersUsed.push(letter1);
            lettersUsed.push(letter2);
        } else {
            let usedFlag = false
            lettersUsed.forEach((letter) => {
                if (letter1.match(letter) || letter2.match(letter)) {
                    usedFlag = true;
                }
            })
            if (!usedFlag) {
                lettersUsed.push(letter1);
                lettersUsed.push(letter2);
            }
        }
    })

    if (lettersUsed.length != 20) {
        alert("Please enter valid plugboard settings.");
    } else {
        plugboardSettings = [];
        for (let i = 0; i < 20; i++) {
            plugboardSettings.push(`${lettersUsed[i]}${lettersUsed[i+1]}`)
            plugboardSettings.push(`${lettersUsed[i+1]}${lettersUsed[i]}`)
            i++
        }
        console.log(plugboardSettings);
    }
}

// add output logic to show encrypted or decrypted info
function encryptOrDecrypt() {
    if (input == null) {
        alert("You haven't added an input string.");
    } if (plugboardSettings == null) {
        alert("You haven't added plugboard settings.");
    } else {
        console.log(`scramble this please: ${input}`);
        let inputCapitalised = input.toUpperCase();
        let output = "";

        // TODO: refactor to function that take input letter and gives output letter
        // -- rather than current take entire string output entire string
        for (let i=0; i < inputCapitalised.length; i++) {
            let letter = inputCapitalised.charAt(i);
            let letterFound = false
            plugboardSettings.forEach((setting) => {
                if (setting[0] == letter) {
                    output = output + setting[1];
                    letterFound = true;
                }
            })
            if (!letterFound) {
                output = output + letter;
            }
        }
        console.log(`The encryption or decryption has returned ${output}`);
    }
}


// 3 - rotor settings

// create three rotor settings
const rotor1Unchanged = "ATQSWERDFYGZUCHXVJLIOPKMNB";
const rotor2Unchanged = "MJUIOKPLNAZVXCBSDGFHYQTWER";
const rotor3Unchanged = "ABZXVSCWQREFDLMYTUIGJPOKHN";
// define reflector
const reflector = "MARKTUNBLQPOWEKIYSJVCZHXGF"

// take combination of rotors and values of they rotors between 1 and 26
// set up counters for those settings, with right most being smallest unit and left most being largest

let rotors = {};

function setUpRotors() {
    // grab inputs
    selectRotors = document.querySelectorAll("#rotors #configs select");
    rotorValues = document.querySelectorAll("#rotors #rotation-values input")
    for (let i = 0; i<3; i++) {
        rotorConfig = selectRotors[i].value;
        if (i == 2) {
            rotors["rotor1"] = {"roman": rotorConfig, "value": rotorValues[i].value - 1};
        }
        if (i == 1) {
            rotors["rotor2"] = {"roman": rotorConfig, "value": rotorValues[i].value - 1};
        }
        if (i == 0) {
            rotors["rotor3"] = {"roman": rotorConfig, "value": rotorValues[i].value - 1};
        }
    }
    console.log(rotors);
}

let rotor1 = rotor1Unchanged;
let rotor2 = rotor2Unchanged;
let rotor3 = rotor3Unchanged;

function getAllRotorOrientations() {
    rotor1Orientations = [rotor1Unchanged];
    rotor2Orientations = [rotor2Unchanged];
    rotor3Orientations = [rotor3Unchanged];

    for (let i = 0; i<25; i++) {
        rotor1 = rotor1.charAt(25) + rotor1.slice(0, 25);
        rotor2 = rotor2.charAt(25) + rotor2.slice(0, 25);
        rotor3 = rotor3.charAt(25) + rotor3.slice(0, 25);
        rotor1Orientations.push(rotor1);
        rotor2Orientations.push(rotor2);
        rotor3Orientations.push(rotor3);
    }
}

function addCounter() {
    if (rotors.rotor1.value < 25) {
        rotors.rotor1.value += 1;
    } else {
        rotors.rotor1.value = 0;
        if (rotors.rotor2.value < 25) {
            rotors.rotor2.value += 1;
        } else {
            rotors.rotor2.value = 0;
            if (rotors.rotor3.value < 25) {
                rotors.rotor3.value += 1;
            } else {
                rotors.rotor3.value = 0;
            }
        }
    }
}

function switchLetter(letter, rotorString) {
    let index = rotorString.indexOf(letter);
    console.log(index + "index")
    if (index % 2 == 0) {
        return rotorString.charAt(index+1);
    } else {
        return rotorString.charAt(index-1);
    }
}

function passThroughRotor(letter) {
    let encryptedLetter = letter;
    Object.values(rotors).forEach((rotor) => {
        if (rotor.roman.match("rotor1")) {
            encryptedLetter = switchLetter(encryptedLetter, rotor1Orientations[rotor.value]);
        }
        if (rotor.roman.match("rotor2")) {
            encryptedLetter = switchLetter(encryptedLetter, rotor2Orientations[rotor.value]);
        }
        if (rotor.roman.match("rotor3")) {
            encryptedLetter = switchLetter(encryptedLetter, rotor3Orientations[rotor.value]);
        }
    })
    console.log(encryptedLetter + "letter");
    return encryptedLetter;
}

function runRotorEncryption() {
    console.log(rotors);
    let encryptedMessage = ""
    for (let i = 0; i < input.length; i ++) {
        // pass through all three rotors.
        const encryptedLetter = passThroughRotor(input.charAt(i));
        encryptedMessage = encryptedMessage + encryptedLetter;
        addCounter();
    }
    console.log(encryptedMessage);
}

