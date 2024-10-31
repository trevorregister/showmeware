import GCalService from "@/infrastructure/external/GCalService"

const GetCalendars = {
    async execute(token){
        const gCalService = new GCalService(token)
        const calendars = await gCalService.getCalendars()
        return calendars
    }
}

export default GetCalendars