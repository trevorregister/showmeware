import { GetCalendars, CreateEvent } from '../use-cases/GCal/index'

const CalendarController = {
    async getCalendars(token) {
        return await GetCalendars.execute(token)
    },
    async createEvent({token, calendarId, event, entryId}){
        return await CreateEvent.execute({token, calendarId, event, entryId})
    }
}

export default CalendarController