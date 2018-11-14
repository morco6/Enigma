
const _reflector = new WeakMap();

export class Reflector {
    constructor() {
        _reflector.set(this, ['AY', 'BR', 'CU', 'DH', 'EQ', 'FS', 'GL', 'HD', 'IP', 'JX', 'KN', 'LG', 'MO', 'NK', 'OM', 'PI', 'QE', 'RB', 'SF', 'TZ', 'UC', 'VW', 'WV', 'XJ', 'YA', 'ZT']);
    }

    /* -getters- */
    get reflector() {
        return _reflector.get(this);
    }

    /* -reflect- */
    reflect(letter) {
        
        let reflector_map = this.reflector;
        let len = reflector_map.length;
        let new_letter = false;

        for (let i = 0; i < len; ++i) {
            if (reflector_map[i].charAt(0) == letter) {
                new_letter = reflector_map[i].charAt(1);
            }
            else if (reflector_map[i].charAt(1) == letter) {
                new_letter = reflector_map[i].charAt(0);
            }
        }
        
        return new_letter;
    }

}