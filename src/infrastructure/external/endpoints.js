const endpoints = {
    calendar: {
        getCalendars: 'https://www.googleapis.com/calendar/v3/users/me/calendarList',
        createEvent: 'https://www.googleapis.com/calendar/v3/calendars/:calendarId/events'
    }
}

export default endpoints