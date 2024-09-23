import ProfileRepo from "@/infrastructure/repositories/ProfileRepo"

const GetProfileByUserId = {
    async execute(user_id){
        return await ProfileRepo.getProfileByUserId(user_id)
    }
}

export default GetProfileByUserId