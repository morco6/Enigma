import { Translator } from './translator.js';

export class PlugBoard extends Translator {
    constructor() {
        super();
    }

    /* -shifting plugboard- */
    shift(pb, letter) {
        
        let pb_len = pb.length;
        let new_letter = false;

        for (let i = 0; i < pb_len; ++i) {

            if (letter == pb[i].charAt(0))
                new_letter = pb[i].charAt(1);

            else if (letter == pb[i].charAt(1))
                new_letter = pb[i].charAt(0);
            
        }

        return new_letter || letter;
    }

}