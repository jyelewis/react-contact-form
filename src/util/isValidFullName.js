
const nameRegex = /[^ ]+( [^ ]+)+/; // at least 2 words, separated by spaces

// TODO: Test
export function isValidFullName(name) {
    return nameRegex.test(name);
}
