import { AuthenticatedRequest } from "@/middlewares/authentication-middleware";
import { Response } from "express";
import httpStatus from "http-status";
import ticketService from "../services/tickets-service/index";

export async function getTicketsFromUsers(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const ticket = await ticketService.getUniqueTicket(userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticket = await ticketService.getTicketTypesService();
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send([]);
  }
}

type tickeType = { ticketTypeId: number };

export async function postNewTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body as tickeType;
  const userId = req.userId;

  try {
    const ticket = await ticketService.postNewTicket(ticketTypeId, userId);
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
