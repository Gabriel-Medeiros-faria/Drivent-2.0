import { prisma } from "@/config";
import dayjs from "dayjs";

async function findUnique(userId: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId,
      },
    },
    include: {
      TicketType: true,
    },
  });
}

async function findMany() {
  return prisma.ticketType.findMany();
}

async function create(ticketTypeId: number, enrollments: number) {
  return prisma.ticket.create({
    data: {
      enrollmentId: enrollments,
      ticketTypeId,
      status: "RESERVED",
    },
  });
}

async function findTicketTypeById(ticketicketTypeId: number) {
  return prisma.ticketType.findFirst({
    where: {
      id: ticketicketTypeId,
    },
  });
}

async function findTicketById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
  });
}

async function updateTicket(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: "PAID",
      updatedAt: dayjs().toISOString(),
    },
  });
}

const ticketRepository = {
  findUnique,
  findMany,
  create,
  findTicketTypeById,
  findTicketById,
  updateTicket,
};

export default ticketRepository;
