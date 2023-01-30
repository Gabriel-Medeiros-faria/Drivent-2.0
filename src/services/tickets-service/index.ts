import ticketRepository from "../../repositories/tickets-repository/index";
import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";

async function getUniqueTicket(userId: number) {
  try {
    const ticket = await ticketRepository.findUnique(userId);
    if (!ticket) throw notFoundError();
    const enrolments = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrolments) throw notFoundError();
    return ticket;
  } catch {
    throw notFoundError();
  }
}

async function getTicketTypesService() {
  try {
    const ticketType = await ticketRepository.findMany();
    return ticketType;
  } catch {
    throw notFoundError();
  }
}

async function postNewTicket(ticketTypeId: number, userId: number) {
  const enrollments = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollments) throw notFoundError();

  const TicketType = await ticketRepository.findTicketTypeById(ticketTypeId);
  if (!TicketType) throw notFoundError();

  const ticket = await ticketRepository.create(ticketTypeId, enrollments.id);

  const ticketAndTicketType = {
    ...ticket,
    TicketType,
  };

  return ticketAndTicketType;
}

const ticketService = {
  getUniqueTicket,
  getTicketTypesService,
  postNewTicket,
};

export default ticketService;
