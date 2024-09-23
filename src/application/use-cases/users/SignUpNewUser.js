import UserRepo from "@/infrastructure/repositories/UserRepo"

const SignUpNewUser = {
    async execute({email, password, options}){
        return await UserRepo.signUpNewUser({
            email: email,
            password: password,
            options: {...options}
        })
    }
}

export default SignUpNewUser