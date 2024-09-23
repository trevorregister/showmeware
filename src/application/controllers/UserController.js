import SignInWithEmailPassword from "../use-cases/users/SignInWithEmailPassword"
import SignUpNewUser from "../use-cases/users/SignUpNewUser"

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
    }
}

export default UserController