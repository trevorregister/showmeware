import GCalService from "@/infrastructure/external/GCalService"

const GetCalendars = {
    async execute(token){
        return GCalService.getCalendars(token)
    }
}

export default GetCalendars