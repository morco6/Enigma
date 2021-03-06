'use strict';
import { Rotor } from './rotor.js';
import { PlugBoard } from './plugboard.js';
import { Reflector } from './reflector.js';

/* -set private params- */
const _rotors = new WeakMap();
const _plugBoard = new WeakMap();

export class Enigma {
    /* -init private params- */
    constructor(rotors, plugBoard) {
        _rotors.set(this, rotors);
        _plugBoard.set(this, plugBoard);

        this.rotor = new Rotor();
        this.plugboard = new PlugBoard();
        this.reflector = new Reflector();
    }

    /* -getters- */
    get rotors() {
        return _rotors.get(this);
    }
    get plugBoard() {
        return _plugBoard.get(this);
    }

    /* -setters- */
    set rotors(value) {
        _rotors.set(this, value);
    }


    /* -check validation of input and starting process- */
    inputValidation(input, obj) {

        if (input === "")
            throw new Error('The input can not be empty!');

        const valid_input = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let input_arr = input.split(" ");
        let output_arr = [];
        let output = "";

        input_arr.forEach((word) => {
            for (let i = 0; i < word.length; i++) {
                if (valid_input.indexOf(word[i]) === -1)
                    throw new Error(`The character ${word[i]} in: ${word} is not allowed!`);

                obj = this.process_letter(word[i], obj);
                obj.proc.text += obj.letter;
            }
            output_arr.push(obj.proc.text);
        });

        output = output_arr.toString();
        output = output.replace(/,/g, ' ');
        obj.proc.text = output;
        return obj;
    }

    process_letter(letter, obj) {

        obj.letter = letter;
            
        // iterate machine - switch from starting position
        this.rotors = this.rotor.iterator(this.rotors);
 
        //////////////////////
        /* -inside machine- */
        //////////////////////

        // plugboard
        obj.letter = this.plugboard.shift(this.plugBoard, obj.letter, true);
        obj.proc.pb = obj.letter;

        // rotor 1
        obj = this.rotor.shift(this.rotors.rotor_1, obj, true, 1);

        // rotor 2
        obj = this.rotor.shift(this.rotors.rotor_2, obj, true, 2);

        // rotor 3
        obj = this.rotor.shift(this.rotors.rotor_3, obj, true, 3);

        // reflector
        obj.letter = this.reflector.reflect(obj.letter);
        obj.proc.ref = obj.letter;

        /////////////////////////////////////////////
        /* -returning from reflector to plugboard- */
        /////////////////////////////////////////////
        
        // rotor 3
        obj = this.rotor.shift(this.rotors.rotor_3, obj, false, 3);

        // rotor 2
        obj = this.rotor.shift(this.rotors.rotor_2, obj, false, 2);

        // rotor 1
        obj = this.rotor.shift(this.rotors.rotor_1, obj, false, 1);

        // plugboard
        obj.letter = this.plugboard.shift(this.plugBoard, obj.letter, false);
        
        return obj;
    }


}
