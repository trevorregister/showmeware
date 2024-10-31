import supabase from "../database/database-service"

const ProfileRepo = {
    async getProfileByUserId(user_id){
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', user_id)
            .single()
        
        if (error) {
            throw new Error(error.message)
        }
        
        return data
    },
    
    async updateCalendarId({user_id, calendar_id}) {
        console.log('calendar_id', calendar_id)
        try {
            const { data, error } = await supabase
                .from('profiles')
                .update({ calendar_id: calendar_id })
                .eq('user_id', user_id)
            console.log('data', data)
            return data
        } catch (err) {
            console.log(err)
        }
    }
}

export default ProfileRepo
