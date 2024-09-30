
// Username: At least 4 characters long, must contain at least 1 letter, and can have letters and numbers.

export const USERNAME = /^[0-9A-Za-z]{4,16}$/;

// Password: At least 6 characters long, must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.
export const PASSWORD= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

