import { GetCalendars } from '../use-cases/users/index'

const CalendarController = {
    async getCalendars(token) {
        return await GetCalendars.execute(token)
    }
}

export default CalendarController