import { checkForUrl } from "../js/urlChecker";

describe('Test check URL functionality', () => {
    test('Testing the checkURL function', () => {
        expect(checkForUrl).toBeDefined()
    })

    test('checkForUrl return false for invalid url', () => {
        expect(checkForUrl('noway')).toBeFalsy()
    })

    test('checkForUrl return true for valid url', () => {
        expect(checkForUrl('http://example.com')).toBeTruthy()
    })
})

