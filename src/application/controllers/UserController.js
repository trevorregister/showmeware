import { 
    SignUpNewUser,
    SignInWithEmailPassword,
    SignOut,
    SignInWithOauth
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

    async signInWithOauth(provider){
        return await SignInWithOauth.execute(provider)
    }
}

export default UserController