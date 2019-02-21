export class Validators{
    static isNonEmptyString(testString = ''){
        return (typeof testString) === 'string' && !!testString.trim().length
    }
}