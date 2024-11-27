import UserRepo from "@/infrastructure/repositories/UserRepo"

const GetMyself = {
    async execute(){
        const myself = await UserRepo.getMyself()
        return myself
    }
}

export default GetMyself