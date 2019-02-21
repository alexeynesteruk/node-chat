import expect from 'expect';

import { Validators } from './validators';

describe('Validators method isNonEmptyString', () => {
    const cases = {
        spaces:'     ',
        emptyString:'',
        standard:' Just regular string 328 73 * &%'
    }

    it('should reject only space on empty string', () => {
        expect(Validators.isNonEmptyString(cases.spaces)).toBe(false);
        expect(Validators.isNonEmptyString(cases.emptyString)).toBe(false);
    })

    it('should allow only string with non-space string', () => {
        expect(Validators.isNonEmptyString(cases.standard)).toBe(true);
    })
})