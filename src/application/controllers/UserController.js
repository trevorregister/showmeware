import { 
    SignUpNewUser,
    SignInWithEmailPassword,
    SignOut,
    SignInWithOauth,
    GetSession
} from '../use-cases/users/index'

const UserController = {
    async signUpNewUser({email, password, options}){
        return await SignUpNewUser.execute({
            email: email,
            password: password,
            options: {...options}
        })
    },

    async signInWithEmailPassword({email, password}){
        return await SignInWithEmailPassword.execute({
            email: email,
            password: password
        })
    },

    async signOut(){
        return await SignOut.execute()
    },

    async signInWithOauth({provider, options}){
        return await SignInWithOauth.execute({provider: provider, options: options})
    },

    async getSession(){
        return await GetSession.execute()
    }
}

export default UserController