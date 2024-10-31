import axios from 'axios'
import endpoints from './endpoints'

export default class GCalService {
    constructor(token){
        this.authHeader = {headers: {"Authorization": `Bearer ${token}`}}
    }

    async getCalendars(){
        const { data } = await axios.get(endpoints.calendar.getCalendars, this.authHeader)
        return data.items
    }
}
