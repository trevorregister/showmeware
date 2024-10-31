import UserRepo from "@/infrastructure/repositories/UserRepo"

const GetSession = {
    async execute(){
        const {data: session } = await UserRepo.getSession()
        return session
    }
}

export default GetSession