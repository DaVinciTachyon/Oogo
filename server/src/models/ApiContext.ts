import { Request } from "express";

export interface ApiRequest extends Request {
    context?: RequestContext;
}

export interface RequestContext {
    user: any;
}