import { Journal } from '@/presentation/types'
import {
    ProfileController,
    UserController,
    CalendarController,
    JournalController,
    EntriesController, } from './controllers/index'
const client = {
    profiles: {
        getProfileByUserId: async (id: string) => ProfileController.getProfileByUserId(id),
        updateCalendarId: async (calendar_id: string) => ProfileController.updateCalendarId(calendar_id)
    },
    users: {
        signUpNewUser: async ({email, password, options = {}}: {email: string, password: string, options?: object}) => UserController.signUpNewUser({
            email: email,
            password: password,
            options: {...options}
        }),
        signInWithEmailPassword: async({email, password}: {email: string, password: string}) => UserController.signInWithEmailPassword({
            email: email,
            password: password
        }),
        signInWithOauth: async({provider, options = {}}: {provider: string, options: object}) => UserController.signInWithOauth({provider, options}),
        getSession: async() => UserController.getSession(),
        signOut: async() => UserController.signOut(),
        getCalendars: async(token: string) => CalendarController.getCalendars(token),
        getMyself: async() => UserController.getMyself()
    },
    journals: {
        createJournal: async(journal: object) => JournalController.createJournal(journal),
        getJournals: async() => JournalController.getJournals(),
        deleteJournalById: async(journal_id: string) => JournalController.deleteJournalById(journal_id),
        changeColor: async({journal, newColor}: {journal: Journal, newColor: string}) => JournalController.changeColor({journal, newColor})
    },
    entries: {
        updateEntryById: async({entry_id, content}: {entry_id: string, content: object}) => EntriesController.updateEntryById({entry_id, content}),
        createEntry: async({journal_id, entry}: {journal_id: string, entry: object}) => EntriesController.createEntry({journal_id, entry}),
        deleteEntryById: async(entry_id: string) => EntriesController.deleteEntryById(entry_id)
    },
    calendars: {
        getCalendars: async(token: string) => CalendarController.getCalendars(token),
        createEvent: async({token, calendarId, event, entryId}: {token: string, calendarId: string, event: object, entryId: string}) => CalendarController.createEvent({token, calendarId, event, entryId}),
        getEventById: async({token, calendarId, eventId}: {token: string, calendarId: string, eventId: string}) => CalendarController.getEventById({token, calendarId, eventId}),
        getEvents: async({token, calendarId}: {token: string, calendarId: string}) => CalendarController.getEvents({token, calendarId}),
        deleteEventById: async({token, calendarId, eventId}: {token: string, calendarId: string, eventId: string}) => CalendarController.deleEventById({token, calendarId, eventId}),
    }
}

export { client }
