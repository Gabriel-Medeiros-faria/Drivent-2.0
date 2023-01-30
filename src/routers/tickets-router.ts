import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketsFromUsers, getTicketTypes, postNewTicket } from "../controllers/tickets-controller";
import { validateBody } from "@/middlewares";
import { ticketSchema } from "@/schemas/ticket-schemas";

const ticketRouter = Router();

ticketRouter
  .all("/*", authenticateToken)
  .get("/", getTicketsFromUsers)
  .get("/types", getTicketTypes)
  .post("/", validateBody(ticketSchema), postNewTicket);
export { ticketRouter };
