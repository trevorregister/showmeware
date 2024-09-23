declare module 'client' {
    export const client: {
        profiles: {
            getProfileByUserId(user_id: string): Promise<any>;
        };
        users: {
            signUpNewUser(data: { email: string; password: string; options?: object }): Promise<any>;
            signInWithEmailPassword(data: { email: string; password: string }): Promise<any>;
        };
    };
}