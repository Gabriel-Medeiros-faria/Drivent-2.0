import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import {getTicketsFromUsers} from "../controllers/tickets-controller"
import { EnrollmentsAuth } from "@/middlewares/Enrollments-middleware";

const ticketRouter = Router();

ticketRouter
    .all("/*", authenticateToken)
    .get("/", EnrollmentsAuth, getTicketsFromUsers)

export { ticketRouter };
