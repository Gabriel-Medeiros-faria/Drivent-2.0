import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import {getTicketsFromUsers, getTicketTypes} from "../controllers/tickets-controller"
import { EnrollmentsAuth } from "@/middlewares/Enrollments-middleware";

const ticketRouter = Router();

ticketRouter
    .all("/*", authenticateToken)
    .get("/", EnrollmentsAuth, getTicketsFromUsers)
    .get("/types", getTicketTypes)
export { ticketRouter };
