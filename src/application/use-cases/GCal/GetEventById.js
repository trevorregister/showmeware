import GCalService from "../../../infrastructure/external/GCalService"

const GetEventById = {
    async execute({token, calendarId, eventId}){
        const gCalService = new GCalService(token)
        return gCalService.getEventById({calendarId, eventId})
    }
}

export default GetEventById