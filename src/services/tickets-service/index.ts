import ticketRepository from "../../repositories/tickets-repository/index"
import { notFoundError } from "@/errors";

async function getUniqueTicket(userId: number) {
    try{
        const ticket = await ticketRepository.findUnique(userId)
        if(!ticket) throw notFoundError()
        return ticket
    }catch{
        throw notFoundError()
    }
}

async function getTicketTypesService(){
    try{
        let ticketType = await ticketRepository.findMany()
        return ticketType

    }catch{
        throw notFoundError()
    }
}



const ticketService = {
    getUniqueTicket,
    getTicketTypesService
}

export default ticketService