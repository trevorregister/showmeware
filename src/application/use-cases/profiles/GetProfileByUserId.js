import ProfileRepo from "@/infrastructure/repositories/ProfileRepo"

const GetProfileByUserId = {
    async execute(id){
        return await ProfileRepo.getProfileByUserId(id)
    }
}

export default GetProfileByUserId
