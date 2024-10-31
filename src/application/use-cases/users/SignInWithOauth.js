import UserRepo from "@/infrastructure/repositories/UserRepo"

const SignInWithOauth = {
    async execute({provider, options}){
        return await UserRepo.signInWithOauth({provider: provider, options: options})
    }
}

export default SignInWithOauth