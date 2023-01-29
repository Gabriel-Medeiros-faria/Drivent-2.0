import { prisma } from "@/config";


async function findUnique(userId: number) {
    return prisma.ticket.findFirst({
        where : {
            Enrollment :{
                userId
            }
        },
        include:{
            TicketType: true
        }
    })
}
const ticketRepository = {
    findUnique
}

export default ticketRepository
