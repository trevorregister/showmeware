import UserRepo from "@/infrastructure/repositories/UserRepo"

const SignInWithEmailPassword = {
    async execute({email, password, }){
        return await UserRepo.signInWithEmailPassword({
            email: email,
            password: password,
        })
    }
}

export default SignInWithEmailPassword