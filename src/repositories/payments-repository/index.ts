import { prisma } from "@/config";
import { typePayments } from "@/protocols";

async function findFirstPayments(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function create(body: typePayments, price: number) {
  return prisma.payment.create({
    data: {
      ticketId: body.ticketId,
      value: price,
      cardIssuer: body.cardData.issuer, // VISA | MASTERCARD
      cardLastDigits: body.cardData.number
        .toString()
        .substring(body.cardData.number.toString().length - 4, body.cardData.number.toString().length),
    },
  });
}
export const paymentsRepository = {
  findFirstPayments,
  create,
};
