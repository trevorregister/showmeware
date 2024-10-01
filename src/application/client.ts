import ProfileController from "./controllers/ProfileController"
import UserController from "./controllers/UserController"

const client = {
    profiles: {
        getProfileByUserId: async (user_id: string) => ProfileController.getProfileByUserId(user_id)
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
        signOut: async() => UserController.signOut()
    }
}

export { client }