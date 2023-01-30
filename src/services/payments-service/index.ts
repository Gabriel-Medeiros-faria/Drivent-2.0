import { notFoundError, requestError, unauthorizedError } from "@/errors";
import { paymentsRepository } from "@/repositories/payments-repository";
import ticketRepository from "@/repositories/tickets-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { typePayments } from "@/protocols";

async function getPayments(ticketId: number, userId: number) {
  if (!ticketId) {
    throw requestError(400, "badRequest");
  }
  const ticket = await ticketRepository.findTicketById(ticketId);
  if (!ticket) {
    throw notFoundError();
  }
  const enrollments = await enrollmentRepository.findWithAddressByUserId(userId);
  if (ticket.enrollmentId !== enrollments.id) {
    throw unauthorizedError();
  }

  const payment = await paymentsRepository.findFirstPayments(ticketId);
  return payment;
}

async function createPayments(body: typePayments, userId: number) {
  const ticket = await ticketRepository.findTicketById(body.ticketId);
  if (!ticket) {
    throw notFoundError();
  }
  const enrollments = await enrollmentRepository.findWithAddressByUserId(userId);
  if (ticket.enrollmentId !== enrollments.id) {
    throw unauthorizedError();
  }
  const ticketType = await ticketRepository.findTicketTypeById(ticket.ticketTypeId);
  const payments = await paymentsRepository.create(body, ticketType.price);
  await ticketRepository.updateTicket(body.ticketId);
  return payments;
}

export const paymentsService = {
  getPayments,
  createPayments,
};
