declare module 'client' {
    export const client: {
        profiles: {
            getProfileByUserId(id: string): Promise<any>
            updateCalendarId(calendar_id: string): Promise<any>
        }
        users: {
            signUpNewUser(data: { email: string; password: string; options?: object }): Promise<any>
            signInWithEmailPassword(data: { email: string; password: string }): Promise<any>
            signOut(): Promise<any>
            signInWithOauth(provider: string): Promise<any>
            getSession(): Promise<any>
            getCalendars(token: string): Promise<any>
        }
        journals: {
            createJournal(journal: object): Promise<any>
            getJournals(): Promise<any>
            changeColor({journal, newColor})
        }
    }
}
