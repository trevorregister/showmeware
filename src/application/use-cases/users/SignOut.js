import UserRepo from "@/infrastructure/repositories/UserRepo"

const SignOut = {
    async execute(){
        return await UserRepo.signOut()
    }
}

export default SignOut