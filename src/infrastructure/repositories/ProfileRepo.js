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
            const { data, error } = await supabase
                .from('profiles')
                .update({ calendar_id: calendar_id })
                .eq('user_id', user_id)
        if (error) {
            throw new Error(error.message)
        }

        return data
    },

    async createProfile(user_id){
      const newProfile = {
          user_id: user_id
      }

      const { data, error } = await supabase
          .from('entries')
          .insert(newProfile)

      return data
  },
}

export default ProfileRepo
