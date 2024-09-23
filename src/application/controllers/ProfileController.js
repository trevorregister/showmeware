import GetProfileByUserId from "../use-cases/profiles/GetProfileByUserId"

const ProfileController = {
    async getProfileByUserId(user_id) {
        return await GetProfileByUserId.execute(user_id)
    }
}

export default ProfileController