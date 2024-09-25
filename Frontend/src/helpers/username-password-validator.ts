import { USERNAME,PASSWORD } from "../constants/regex";
export function isPasswordValid(password: string): boolean {
    const isValid = PASSWORD.test(password);
    console.log(`Password validation: ${isValid}`);
    return isValid;
}

export function isUsernameValid(username: string): boolean {
    const isValid = USERNAME.test(username);
    console.log(`Username validation: ${isValid}`);
    return isValid;
}

