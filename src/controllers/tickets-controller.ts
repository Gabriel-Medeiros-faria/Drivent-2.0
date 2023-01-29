import { AuthenticatedRequest } from "@/middlewares/authentication-middleware";
import { Response } from "express";
import httpStatus from "http-status";
import ticketService from "../services/tickets-service/index"

export async function getTicketsFromUsers(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId
  
  try {
    const ticket = await ticketService.getUniqueTicket(userId)
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
