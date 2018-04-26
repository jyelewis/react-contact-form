import {isValidFullName} from "./isValidFullName";

it('Doesn\'t pass empty names', () => {
    expect(isValidFullName('')).toBeFalsy();
});

it('Doesn\'t pass single names', () => {
    expect(isValidFullName('Jye')).toBeFalsy();
    expect(isValidFullName('Kate')).toBeFalsy();
});

it('Only allows a space as a separator', () => {
    expect(isValidFullName('Jye_Lewis')).toBeFalsy();
    expect(isValidFullName('Jye.Lewis')).toBeFalsy();
    expect(isValidFullName('Jye\nLewis')).toBeFalsy();
    expect(isValidFullName('Jye\tLewis')).toBeFalsy();
});

it('Passes "firstname lastname"', () => {
    expect(isValidFullName('Jye Lewis')).toBeTruthy();
    expect(isValidFullName('hello world')).toBeTruthy();
});

it('Allows having more than 2 names, separated by a space', () => {
    expect(isValidFullName('Jye Nathan Lewis')).toBeTruthy();
    expect(isValidFullName('hello world test')).toBeTruthy();
    expect(isValidFullName('hello world much longer test name')).toBeTruthy();
});
