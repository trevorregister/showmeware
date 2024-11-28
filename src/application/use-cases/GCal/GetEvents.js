import GCalService from "../../../infrastructure/external/GCalService"

const GetEvents = {
    async execute({token, calendarId}){
        const gCalService = new GCalService(token)
        return gCalService.getEvents(calendarId)
    }
}

export default GetEvents