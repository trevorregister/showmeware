import { GetProfileByUserId, UpdateCalendarId } from '../use-cases/profiles/index'

const ProfileController = {
    async getProfileByUserId(id) {
        return await GetProfileByUserId.execute(id)
    },
    async updateCalendarId(calendar_id) {
        return await UpdateCalendarId.execute(calendar_id)
    }
}

export default ProfileController
