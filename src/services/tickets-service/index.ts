import ticketRepository from "../../repositories/tickets-repository/index"
import { notFoundError } from "@/errors";
import { exclude } from "@/utils/prisma-utils";


async function getUniqueTicket(userId: number) {
    try{
        const ticket = await ticketRepository.findUnique(userId)
        if(!ticket) throw notFoundError()
        return ticket
    }catch{
        throw notFoundError()
    }
}



const ticketService = {
    getUniqueTicket
}

export default ticketService