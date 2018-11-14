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
    inputValidation(input) {

        if (input === "")
            throw new Error('The input can not be empty!');

        const valid_input = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let input_arr = input.split(" ");
        let output_arr = [];
        let output = "";

        input_arr.forEach((word) => {
            let enc_word = "";
            for (let i = 0; i < word.length; i++) {
                console.log(word[i]);
                if (valid_input.indexOf(word[i]) === -1)
                    throw new Error(`The character ${word[i]} in: ${word} is not allowed!`);

                enc_word += this.process_letter(word[i]);
            }
            output_arr.push(enc_word);
        });

        output = output_arr.toString();
        output = output.replace(/,/g, ' ');
        return output;
    }

    process_letter(letter) {

        
            
        // iterate machine - switch from starting position
        this.rotors = this.rotor.iterator(this.rotors);
 
        //////////////////////
        /* -inside machine- */
        //////////////////////

        // plugboard
        letter = this.plugboard.shift(this.plugBoard, letter, true);
 

        // rotor 1
        letter = this.rotor.shift(this.rotors.rotor_1, letter, true);
   
        //console.log('1: ' + letter);

        // rotor 2
        letter = this.rotor.shift(this.rotors.rotor_2, letter, true);

        //console.log('2: ' + letter);

        // rotor 3
        letter = this.rotor.shift(this.rotors.rotor_3, letter, true);

        //console.log('3: ' + letter);

        // reflector
        letter = this.reflector.reflect(letter);

        //console.log('ref: ' + letter);

        /////////////////////////////////////////////
        /* -returning from reflector to plugboard- */
        /////////////////////////////////////////////
        
        // rotor 3
        letter = this.rotor.shift(this.rotors.rotor_3, letter, false);

        //console.log('3back: ' + letter);

        // rotor 2
        letter = this.rotor.shift(this.rotors.rotor_2, letter, false);

        //console.log('2back: ' + letter);

        // rotor 1
        letter = this.rotor.shift(this.rotors.rotor_1, letter, false);

        //console.log('1back: ' + letter);

        // plugboard
        letter = this.plugboard.shift(this.plugBoard, letter, false);

        //console.log('+=FINAL LETTER=: ' + letter);
        
        return letter;
    }


}