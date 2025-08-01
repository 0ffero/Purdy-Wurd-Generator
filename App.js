"use strict";
document.getElementById('submit').addEventListener('click', function() {
    const textEntry = document.getElementById('textEntry').value;
    if (textEntry.length > 16) {
        alert('Please enter a maximum of 16 characters.');
    } else {
        vars.convertToPretty(textEntry);
    };
});


var vars = {
    alphabet: {},
    letters: [
        '01100',
        '10010',
        '11110',
        '10010',
        '10010',

        '11100',
        '10010',
        '11100',
        '10010',
        '11100',

        '01110',
        '10000',
        '10000',
        '10000',
        '01110',

        '11100',
        '10010',
        '10010',
        '10010',
        '11100',

        '1110',
        '1000',
        '1100',
        '1000',
        '1110',

        '1110',
        '1000',
        '1100',
        '1000',
        '1000',

        '11110',
        '10000',
        '10110',
        '10010',
        '11110',

        '10010',
        '10010',
        '11110',
        '10010',
        '10010',

        '1110',
        '0100',
        '0100',
        '0100',
        '1110',

        '01110',
        '00010',
        '00010',
        '10010',
        '01100',

        '10010',
        '10100',
        '11000',
        '10100',
        '10010',

        '1000',
        '1000',
        '1000',
        '1000',
        '1110',

        '110110',
        '101010',
        '101010',
        '101010',
        '101010',

        '11100',
        '10010',
        '10010',
        '10010',
        '10010',

        '11110',
        '10010',
        '10010',
        '10010',
        '11110',

        '11100',
        '10010',
        '11100',
        '10000',
        '10000',

        '01110',
        '10010',
        '01110',
        '00010',
        '00010',

        '11100',
        '10010',
        '11100',
        '10010',
        '10010',

        '01110',
        '10000',
        '01100',
        '00010',
        '11100',

        '1110',
        '0100',
        '0100',
        '0100',
        '0100',

        '10010',
        '10010',
        '10010',
        '10010',
        '11110',

        '1010',
        '1010',
        '1010',
        '1010',
        '0100',

        '100010',
        '100010',
        '100010',
        '101010',
        '010100',

        '10010',
        '10010',
        '01100',
        '10010',
        '10010',

        '100010',
        '100010',
        '010100',
        '001000',
        '001000',

        '11110',
        '00010',
        '01100',
        '10000',
        '11110',

        '01100',
        '10010',
        '10010',
        '10010',
        '01100',

        '0100',
        '1100',
        '0100',
        '0100',
        '1110',

        '01100',
        '10010',
        '00100',
        '01000',
        '11110',

        '1100',
        '0010',
        '0100',
        '0010',
        '1100',

        '1010',
        '1010',
        '1110',
        '0010',
        '0010',

        '1110',
        '1000',
        '1110',
        '0010',
        '1110',

        '01100',
        '10000',
        '11100',
        '10010',
        '01100',

        '11110',
        '00010',
        '00100',
        '01000',
        '10000',
        
        '01100',
        '10010',
        '01100',
        '10010',
        '01100',

        '1110',
        '1010',
        '1110',
        '0010',
        '1110',

        '000',
        '000',
        '000',
        '000',
        '000',

        '001000',
        '001000',
        '111110',
        '001000',
        '001000',

        '0000',
        '0000',
        '1110',
        '0000',
        '0000',

        '00',
        '00',
        '00',
        '00',
        '10',

        '010',
        '010',
        '010',
        '000',
        '010',

        '01100',
        '10010',
        '00100',
        '00000',
        '00100',
    ],
    negativeSpace: '🔳',
    positiveSpace: '🟥',

    init: ()=> {
        vars.buildAlphabet();

        let textEntry = vars.textEntry = document.getElementById('textEntry');
        textEntry.addEventListener('keyup', (e)=> {
            if (e.key === 'Enter') {
                document.getElementById('submit').click();
            };
        });
        textEntry.focus();
    },

    buildAlphabet: ()=> {
        let alphabet = {};
        for (let i=65; i<65+26; i++) { // A-Z
            alphabet[String.fromCharCode(i)] = vars.letters.splice(0,5);
        };

        for (let i=0; i<10; i++) {
            alphabet[String(i)] = vars.letters.splice(0,5);
        };

        alphabet[' '] = vars.letters.splice(0,5);
        alphabet['+'] = vars.letters.splice(0,5);
        alphabet['-'] = vars.letters.splice(0,5);
        alphabet['.'] = vars.letters.splice(0,5);
        alphabet['!'] = vars.letters.splice(0,5);
        alphabet['?'] = vars.letters.splice(0,5);

        vars.alphabet = alphabet;
        delete vars.letters;
    },

    convertToPretty: (text) => {
        if (!text || text.length === 0) return;

        vars.textEntry.value = '';

        let letters = text.split('');
        let output = [];
        letters.forEach((l,lI)=> {
            if (!vars.alphabet[l.toUpperCase()]) {
                alert(`No pretty representation for: ${l}`);
                debugger;
                return;
            };
            let letterRepresentation = vars.alphabet[l.toUpperCase()];
            letterRepresentation.forEach((row, rI) => {
                let rowOutput = '';
                for (let i=0; i<row.length; i++) {
                    if (row[i] === '1') {
                        rowOutput += vars.positiveSpace;
                    } else {
                        rowOutput += vars.negativeSpace;
                    };
                };
                output[rI] ? (output[rI] += rowOutput) : (output[rI] = rowOutput);
            });
        });

        text = output.join('\r\n');
        document.getElementById('outputContainer').innerHTML += `<pre>${text}</pre>`;
    },

    removeSelected: ()=> {
        [...document.getElementsByClassName('selected')].forEach((s)=> {
            s.classList.remove('selected')
        });
    },

    setColour: (clickedDiv)=> {
        vars.removeSelected();
        clickedDiv.classList.add('selected');

        let colour = clickedDiv.id;
        switch (colour) {
            case 'red':    vars.positiveSpace = '🟥'; break;
            case 'blue':   vars.positiveSpace = '🟦'; break;
            case 'orange': vars.positiveSpace = '🟧'; break;
            case 'yellow': vars.positiveSpace = '🟨'; break;
            case 'green':  vars.positiveSpace = '🟩'; break;
            case 'pink':   vars.positiveSpace = '🟪'; break;
            case 'brown':  vars.positiveSpace = '🟫'; break;
        };

        vars.textEntry.focus();
    }
};

vars.init();