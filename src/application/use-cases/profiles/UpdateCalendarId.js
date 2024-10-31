import ProfileRepo from "@/infrastructure/repositories/ProfileRepo"

const UpdateCalendarId = {
    async execute({user_id, calendar_id}){
        return await ProfileRepo.updateCalendarId({user_id: user_id, calendar_id: calendar_id})
    }
}

export default UpdateCalendarId