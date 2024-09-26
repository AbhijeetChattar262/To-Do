import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/AUTH";
import { AUTH_DEFAULTS, AUTH_HEADERS, AUTH_PREFIXES } from "../constants/MIDDLEWARE";
import { ApiResponseService } from "../services/api-response.service";

export class TokenUtils {

    public static getToken(req: any) {
        const authHeader = req.headers[AUTH_HEADERS.AUTHORIZATION];

    // Ensure authHeader is a string before calling startsWith
    const token = typeof authHeader === "string" && authHeader.startsWith(AUTH_PREFIXES.BEARER)
        ? authHeader.split(" ")[1]
        : null;

    return token;
}

    public static generateToken(id: number): string {
        return jwt.sign({ id }, process.env.JWT_SECRET || JWT_SECRET, {
            expiresIn: "1d",
        });
    }

    public static verifyToken(token: string) {
        return jwt.verify(token, process.env.JWT_SECRET || AUTH_DEFAULTS.JWT_SECRET);
    }

}