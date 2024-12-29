import { GetCalendars, CreateEvent, GetEventById, GetEvents, DeleteEventById } from '../use-cases/GCal/index'

const CalendarController = {
    async getCalendars(token) {
        return await GetCalendars.execute(token)
    },
    async createEvent({token, calendarId, event, entryId}){
        return await CreateEvent.execute({token, calendarId, event, entryId})
    },
    async getEventById({token, calendarId, eventId}){
        return await GetEventById.execute({token, calendarId, eventId})
    },
    async getEvents({token, calendarId}){
        return await GetEvents.execute({token, calendarId})
    },
    async deleEventById({token, calendarId, eventId}){
      return await DeleteEventById.execute({token, calendarId, eventId})
    },
}

export default CalendarController
