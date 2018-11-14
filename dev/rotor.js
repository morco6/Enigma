import { Translator } from './translator.js';

const _rotors = new WeakMap();

export class Rotor extends Translator {
    constructor() {
        super();
        const turnover_notch = {
            "I": { map: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", step: "R" },
            "II": { map: "AJDKSIRUXBLHWTMCQGZNPYFVOE", step: "F" },
            "III": { map: "BDFHJLCPRTXVZNYEIWGAKMUSQO", step: "W" },
            "IV": { map: "ESOVPZJAYQUIRHXLNFTGKDCMWB", step: "K" },
            "V": { map: "VZBRGITYUPSDNHLXAWMJQOFECK", step: "A" }
        };
        _rotors.set(this, turnover_notch);
    }

    /* -getters- */
    get rotors() {
        return _rotors.get(this);
    }

    /* -shift rotors- */
    iterator(rotors) {

        rotors.rotor_1.ring_offset++;
        rotors.rotor_1.ring_offset %= 26;
        let new_setting = rotors.rotor_1.ring_offset;
        let new_setting2 = rotors.rotor_2.ring_offset;
        //console.log('off1: ' + String.fromCharCode(64 + new_setting) + ' off2: ' + String.fromCharCode(64 + new_setting2));
        if ((this.rotors[rotors.rotor_1.type].step === String.fromCharCode(64 + new_setting)) || (this.rotors[rotors.rotor_2.type].step === String.fromCharCode(65 + new_setting2))) {
            if (this.rotors[rotors.rotor_2.type].step === String.fromCharCode(65 + new_setting2))
                rotors.rotor_3.ring_offset++;
            rotors.rotor_2.ring_offset++;
            //console.log("up");
        }
        
        return rotors;
    }

    /* -increment position- */
    increment_rotor(letter) {
        
        if (letter === 26) 
            letter = 1;
        else {
            let position = (letter.charCodeAt(0)-65);
            position++;
            letter = String.fromCharCode(65 + position);
        }

        return letter;
    }
    
    p(letter, ring_offset, ring_setting, rotor_map) {//

        //console.log('letter: ' + letter + ", ring_offset: " + ring_offset + ",ring_setting: " + ring_setting);
        let b = ring_offset;   
        
        let pos = ((letter.charCodeAt(0)) - 65) + 1;
        let new_letter = b + pos;
        

        new_letter -= (ring_setting);
        
        new_letter %= 26;
        
        if (new_letter < 1)
            new_letter += 26;
        
        new_letter = rotor_map[new_letter - 1];

        //console.log('new letter: ' + new_letter);
        return new_letter;
    }

    p2(letter, ring_offset, ring_setting) {
        let pos = ((letter.charCodeAt(0)) - 65) + 1;

        let b = ring_offset;   
        let new_letter = pos - b;
        //console.log('NEWLETTER: ' + new_letter);
        
        new_letter += (ring_setting);
        
        if (new_letter < 1)
            new_letter += 26;
        if (new_letter > 26) 
            new_letter %= 26;
        
        new_letter = String.fromCharCode(65 + new_letter - 1);

        return new_letter;
    }

        /* -shift rotor include reverse- */
   shift(rotor, letter, direction) {
       let rotor_map = this.rotors[rotor.type].map;
       let new_letter = false;
       
       let ring_setting = rotor.setting;//2
       let ring_offset = rotor.ring_offset;//V=22

       if (direction) {
           letter = this.p(letter, ring_offset, ring_setting, rotor_map);
           new_letter = this.p2(letter, ring_offset, ring_setting);
           
       }
       else {//reverse
           let b = ring_offset; 
           new_letter = this.p(letter, ring_offset, ring_setting, rotor_map);
           //console.log('reverse: ' + new_letter);
           let p = rotor_map.indexOf(new_letter) + 1;

           //console.log('p: ' + p);
           let index = String.fromCharCode(65 + p - 1);
           index = ((index.charCodeAt(0)) - 65) + 1;
           index = String.fromCharCode(65 + index - 1);
           index = rotor_map.indexOf(index)+1;
           //console.log('index: ' + index);

           index -= b;
           index += (ring_setting);

           if (index < 1)
               index += 26;
           if (index > 26)
               index %= 26;
           new_letter = String.fromCharCode(65 + index - 1);
           
       }
       return new_letter;
    }
    
    
}