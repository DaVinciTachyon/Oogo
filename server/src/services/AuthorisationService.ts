import config from "../configurations/server.js";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiRequest } from "../models/ApiContext.js";
import { UserRole } from "../models/UserRole.js";

export function isAuthenticated(req: ApiRequest, _res: Response, next: NextFunction) {
    const token = req.header('Authorization')
    if (token === undefined || token === null) throw new Error("Unauthorised");
    try {
        const tokenData = jwt.verify(token, config.secretPhrase);
        if (tokenData) {
            req.context = { user: tokenData };
            return next();
        }
    } catch (err) {
        throw new Error("Unauthorised");
    }
    throw new Error("Unauthorised");
}

export function isAdmin(req: ApiRequest, _res: Response, next: NextFunction) {
    if(req.context?.user.role === UserRole.ADMIN) return next();
    throw new Error("Unauthorised");
}
