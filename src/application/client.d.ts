declare module 'client' {
    export const client: {
        profiles: {
            getProfileByUserId(user_id: string): Promise<any>
        }
        users: {
            signUpNewUser(data: { email: string; password: string; options?: object }): Promise<any>
            signInWithEmailPassword(data: { email: string; password: string }): Promise<any>
            signOut(): Promise<any>
            signInWithOauth(provider: string): Promise<any>
        }
    }
}