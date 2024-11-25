import UserRepo from "@/infrastructure/repositories/UserRepo"

const GetSession = {
    async execute(){
        const session = await UserRepo.getSession()
        return session
    }
}

export default GetSession