import { 
    ProfileController, 
    UserController, 
    CalendarController, 
    JournalController, 
    EntriesController, } from './controllers/index'
const client = {
    profiles: {
        getProfileByUserId: async (user_id: string) => ProfileController.getProfileByUserId(user_id),
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
        getCalendars: async(token: string) => CalendarController.getCalendars(token)
    },
    journals: {
        createJournal: async(journal: object) => JournalController.createJournal(journal),
        getJournals: async() => JournalController.getJournals(),
        deleteJournalById: async(journal_id: string) => JournalController.deleteJournalById(journal_id)
    },
    entries: {
        updateEntryById: async({entry_id, content}: {entry_id: string, content: object}) => EntriesController.updateEntryById({entry_id, content}),
        createEntry: async({journal_id, entry}: {journal_id: string, entry: object}) => EntriesController.createEntry({journal_id, entry}),
        deleteEntryById: async(entry_id: string) => EntriesController.deleteEntryById(entry_id)
    },
    calendars: {
        getCalendars: async(token: string) => CalendarController.getCalendars(token)
    }
}

export { client }