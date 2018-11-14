/* -implementation of abstract class- */
export class Translator {
    constructor() {
        if (new.target == Translator) 
            throw new TypeError("Cannot create an instance of an abstract class");
    }

    shift(settings, letter, direction) {
        throw new Error("Method 'shift' must be implemented.");
    };

    
}
