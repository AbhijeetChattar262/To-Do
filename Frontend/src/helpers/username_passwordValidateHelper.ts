import { USERNAME,PASSWORD } from "../constants/REGEX/RegexConstants";
export function isPasswordValid(password:string):boolean{
    console.log(PASSWORD.test(password))
    return PASSWORD.test(password);

}

export function isUsernameValid(username:string):boolean{
    console.log(USERNAME.test(username));
    return USERNAME.test(username);
}

