const endpoints = {
    calendar: {
        getCalendars: 'https://www.googleapis.com/calendar/v3/users/me/calendarList',
        createEvent: 'https://www.googleapis.com/calendar/v3/calendars/:calendarId/events',
        getEvents: 'https://www.googleapis.com/calendar/v3/calendars/:calendarId/events/:eventId'
    }
}

export default endpoints