import ProfileRepo from "@/infrastructure/repositories/ProfileRepo"
import UserRepo from "@/infrastructure/repositories/UserRepo"

const UpdateCalendarId = {
    async execute(calendar_id){
        const { id } = await UserRepo.getUser()
        return await ProfileRepo.updateCalendarId({user_id: id, calendar_id: calendar_id})
    }
}

export default UpdateCalendarId