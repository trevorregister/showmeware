import SignUpNewUser from "../use-cases/users/SignUpNewUser"

const UserController = {
    async signUpNewUser({email, password, options}){
        return await SignUpNewUser.execute({
            email: email,
            password: password,
            options: {...options}
        })
    }
}

export default UserController