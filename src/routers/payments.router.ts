import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getPayments, postPayments } from "@/controllers/payments-controller";
import { paymentsSchema } from "@/schemas/payments-schemas";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPayments)
  .post("/process", validateBody(paymentsSchema), postPayments);
export { paymentsRouter };
