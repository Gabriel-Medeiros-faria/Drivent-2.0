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

async function findMany(){
    return prisma.ticketType.findMany()
}

const ticketRepository = {
    findUnique,
    findMany
}

export default ticketRepository
