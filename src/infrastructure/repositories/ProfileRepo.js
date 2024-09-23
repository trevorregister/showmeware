import supabase from "../database/database-service"

const ProfileRepo = {
    async getProfileByUserId(user_id){
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', user_id)
            .single()
        return data
    }
}

export default ProfileRepo
