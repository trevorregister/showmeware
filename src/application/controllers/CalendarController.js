import { GetCalendars, CreateEvent } from '../use-cases/GCal/index'

const CalendarController = {
    async getCalendars(token) {
        return await GetCalendars.execute(token)
    },
    async createEvent({token, calendarId, event}){
        return await CreateEvent.execute({token, calendarId, event})
    }
}

export default CalendarController