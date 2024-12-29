import GCalService from "../../../infrastructure/external/GCalService"
import EntriesRepo from "../../../infrastructure/repositories/EntriesRepo"
const CreateEvent = {
    async execute({token, calendarId, event, entryId}){
        const gCalService = new GCalService(token)
        const response = await gCalService.createEvent({calendarId, event})
        await EntriesRepo.addEventToEntry({entry_id: entryId, event: response})
        return response
    }
}

export default CreateEvent
