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
    if(event.key === 'Enter') {
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
// dont need this? if letter not included then letter maps to letter.
//        let lettersUsedSet = new Set(lettersUsed);
//        let alphabetSet = new Set('abcdefghijklmnopqrstuvwxyz'.split(''));
//        let lettersNotUsed = lettersUsed.prototype.difference(alphabetSet)
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
