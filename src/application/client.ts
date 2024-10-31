import { ProfileController, UserController, CalendarController, JournalController } from './controllers/index'
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
        getJournals: async() => JournalController.getJournals()
    }
}

export { client }