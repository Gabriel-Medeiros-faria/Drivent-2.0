import { AuthenticatedRequest } from "@/middlewares/authentication-middleware";
import { Response } from "express";
import httpStatus from "http-status";
import { paymentsService } from "@/services/payments-service";
import { typePayments } from "@/protocols";

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query as Record<string, string>;
  const userId = req.userId;

  try {
    const payments = await paymentsService.getPayments(parseInt(ticketId), userId);

    res.status(200).send(payments);
  } catch (error) {
    if (error.name === "RequestError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}

export async function postPayments(req: AuthenticatedRequest, res: Response) {
  const body = req.body as typePayments;
  const userId = req.userId;

  try {
    const payment = await paymentsService.createPayments(body, userId);
    res.status(200).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}
