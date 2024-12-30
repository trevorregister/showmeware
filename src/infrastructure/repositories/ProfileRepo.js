import supabase from "../database/database-service"

const ProfileRepo = {
    async getProfileByUserId(id){
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            throw new Error(error.message)
        }

        return data
    },

    async updateCalendarId({id, calendar_id}) {
            const { data, error } = await supabase
                .from('profiles')
                .update({ calendar_id: calendar_id })
                .eq('id', id)
        if (error) {
            throw new Error(error.message)
        }

        return data
    },
}

export default ProfileRepo
