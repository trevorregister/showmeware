import { GetProfileByUserId, UpdateCalendarId } from '../use-cases/profiles/index'

const ProfileController = {
    async getProfileByUserId(user_id) {
        return await GetProfileByUserId.execute(user_id)
    },
    async updateCalendarId(calendar_id) {
        return await UpdateCalendarId.execute(calendar_id)
    }
}

export default ProfileController