import enrollmentRepository from "@/repositories/enrollment-repository";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "./authentication-middleware";


export async function EnrollmentsAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const userId = req.userId

    try{
        await enrollmentRepository.findWithAddressByUserId(userId)
    }catch(err){
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
    next()
}