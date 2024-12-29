import GCalService from "../../../infrastructure/external/GCalService"

const DeleteEventById = {
    async execute({token, calendarId, eventId}){
        const gCalService = new GCalService(token)
        return gCalService.deleteEventById({calendarId, eventId})
    }
}

export default DeleteEventById
