import { GetProfileByUserId, UpdateCalendarId } from '../use-cases/profiles/index'

const ProfileController = {
    async getProfileByUserId(user_id) {
        return await GetProfileByUserId.execute(user_id)
    },
    async updateCalendarId({user_id, calendar_id}) {
        return await UpdateCalendarId.execute({user_id: user_id, calendar_id: calendar_id})
    }
}

export default ProfileController