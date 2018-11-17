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
    
    p(obj, ring_offset, ring_setting, rotor_map, rotorName, direction) {//

        console.log('letter: ' + obj.letter + ", ring_offset: " + ring_offset + ",ring_setting: " + ring_setting);
        let b = ring_offset;   
        
        let pos = ((obj.letter.charCodeAt(0)) - 65) + 1;
        let new_letter = b + pos;
        

        new_letter -= (ring_setting);
        
        new_letter %= 26;
        
        if (new_letter < 1)
            new_letter += 26;
        let tmp = String.fromCharCode(64 + new_letter);

        if (direction) {
            if (rotorName === 1)
                obj.proc.rr = tmp;
            if (rotorName === 2)
                obj.proc.mr = tmp;
            if (rotorName === 3)
                obj.proc.lr = tmp;
        }
        else {
            if (rotorName === 1)
                obj.proc.rev_rl = tmp;
            if (rotorName === 2)
                obj.proc.rev_ml = tmp;
            if (rotorName === 3)
                obj.proc.rev_ll = tmp;
        }
        new_letter = rotor_map[new_letter - 1];

        console.log('new letter: ' + new_letter);
        obj.letter = new_letter
        return obj;
    }

    p2(letter, ring_offset, ring_setting) {
        let pos = ((letter.charCodeAt(0)) - 65) + 1;

        let b = ring_offset;   
        let new_letter = pos - b;
        
        new_letter += (ring_setting);
        
        if (new_letter < 1)
            new_letter += 26;
        if (new_letter > 26) 
            new_letter %= 26;
        
        new_letter = String.fromCharCode(65 + new_letter - 1);
        return new_letter;
    }

        /* -shift rotor include reverse- */
    shift(rotor, obj, direction, rotorName) {

       let rotor_map = this.rotors[rotor.type].map;
       let new_letter = false;
       
       let ring_setting = rotor.setting;//2
       let ring_offset = rotor.ring_offset;//V=22

        if (direction) {
            obj = this.p(obj, ring_offset, ring_setting, rotor_map, rotorName, direction);
            if (rotorName === 1)
                obj.proc.rl = obj.letter;
            if (rotorName === 2)
                obj.proc.ml = obj.letter;
            if (rotorName === 3)
                obj.proc.ll = obj.letter;

            new_letter = this.p2(obj.letter, ring_offset, ring_setting);
            if (rotorName === 1)
                obj.proc.out_r = new_letter;
            if (rotorName === 2)
                obj.proc.out_m = new_letter;
            if (rotorName === 3)
                obj.proc.out_l = new_letter;
            obj.letter = new_letter;
        }
        else {//reverse
            let b = ring_offset;
            obj = this.p(obj, ring_offset, ring_setting, rotor_map, rotorName);

            
            //console.log('reverse: ' + obj.letter);
            let p = rotor_map.indexOf(obj.letter) + 1;

            //console.log('p: ' + p);
            let index = String.fromCharCode(65 + p - 1);
            index = ((index.charCodeAt(0)) - 65) + 1;
            index = String.fromCharCode(65 + index - 1);
            index = rotor_map.indexOf(index) + 1;
            //console.log('index: ' + index);

            if (rotorName === 1)
                obj.proc.rev_rr = String.fromCharCode(65 + index - 1);
            if (rotorName === 2)
                obj.proc.rev_mr = String.fromCharCode(65 + index - 1);
            if (rotorName === 3)
                obj.proc.rev_lr = String.fromCharCode(65 + index - 1);

            index -= b;
            index += (ring_setting);

            if (index < 1)
                index += 26;
            if (index > 26)
                index %= 26;
            obj.letter = String.fromCharCode(65 + index - 1);

            if (rotorName === 1)
                obj.proc.rev_out_r = obj.letter;
            if (rotorName === 2)
                obj.proc.rev_out_m = obj.letter;
            if (rotorName === 3)
                obj.proc.rev_out_l = obj.letter;
        }
       return obj;
    }
    
    
}
