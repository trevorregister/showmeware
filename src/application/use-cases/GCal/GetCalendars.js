import GCalService from "../../../infrastructure/external/GCalService"

const GetCalendars = {
    async execute(token){
        const gCalService = new GCalService(token)
        return gCalService.getCalendars()
    }
}

export default GetCalendars