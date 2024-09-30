import jwt from "jsonwebtoken";
import { Response } from "express";
import { API_RESPONSES, AUTH_DEFAULTS, AUTH_HEADERS, AUTH_PREFIXES } from "../constants";
import { ApiResponseService } from "../services/api-response.service";

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

    static verifyToken(res: Response, token: string) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET || AUTH_DEFAULTS.JWT_SECRET);
        } catch (error) {
            ApiResponseService.apiResponse(res, API_RESPONSES.UNAUTHORIZED.code, API_RESPONSES.UNAUTHORIZED.message);
        }
    }

    static generateToken(id: number) {
        return jwt.sign({ id }, process.env.JWT_SECRET || AUTH_DEFAULTS.JWT_SECRET, {
            expiresIn: "1d",
        });
    }

}