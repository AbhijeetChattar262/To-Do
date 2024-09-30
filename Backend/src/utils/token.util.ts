import jwt from "jsonwebtoken";
import { AUTH_DEFAULTS, AUTH_HEADERS, AUTH_PREFIXES } from "../constants/middleware";

export class TokenUtils {
    static getToken(req: any) {
    const authHeader = req.headers[AUTH_HEADERS.AUTHORIZATION];
    const token = typeof authHeader === "string" && authHeader.startsWith(AUTH_PREFIXES.BEARER)
        ? authHeader.split(" ")[1]
        : null;
    if (!token) {
        return null;
    }
    return token;
    }

    static verifyToken(token: string) {
        return jwt.verify(token, process.env.JWT_SECRET || AUTH_DEFAULTS.JWT_SECRET);
    }

    static generateToken(id: number) {
        return jwt.sign({ id }, process.env.JWT_SECRET || AUTH_DEFAULTS.JWT_SECRET, {
            expiresIn: "1d",
        });
    }

}