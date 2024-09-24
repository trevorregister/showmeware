import UserRepo from "@/infrastructure/repositories/UserRepo"

const SignInWithOauth = {
    async execute(provider){
        return await UserRepo.signInWithOauth(provider)
    }
}

export default SignInWithOauth