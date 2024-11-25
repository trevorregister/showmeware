import GCalService from "../../../infrastructure/external/GCalService"

const CreateEvent = {
    async execute({token, calendarId, event}){
        const gCalService = new GCalService(token)
        return gCalService.createEvent({calendarId, event})
    }
}

export default CreateEvent