import axios from 'axios'
import endpoints from './endpoints'

export default class GCalService {
    constructor(token){
        this.authHeader = {headers: {"Authorization": `Bearer ${token}`}}
    }

    async getCalendars(){
        const request = endpoints.calendar.getCalendars
        const { data } = await axios.get(request, this.authHeader)
        return data.items
    }

    async createEvent({calendarId, event}){
        const request = endpoints.calendar.createEvent.replace(':calendarId', calendarId)
        const { data } = await axios.post(request, event, this.authHeader)
        return data
    }

    async getEventById({calendarId, eventId}){
        const request = endpoints.calendar.getEventById.replace(':calendarId', calendarId).replace(':eventId', eventId)
        const { data } = await axios.get(request, this.authHeader)
        return data
    }

    async getEvents(calendarId){
        const request = endpoints.calendar.createEvent.replace(':calendarId', calendarId)
        const { data: { items } } = await axios.get(request, this.authHeader)
        return items
    }
}
