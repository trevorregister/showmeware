import supabase from "../database/database-service"

const JournalRepo = {
    async getJournalByUserId(user_id){
        const { data, error } = await supabase
            .from('journals')
            .select('*')
            .eq('user_id', user_id)
            .single()
        
        if (error) {
            throw new Error(error.message)
        }
        
        return data
    },

    async createJournal(journal){
        const { id } = supabase.auth.getUser()
        const newJournal = {
            id: journal.id,
            circle: journal.circle,
            user_id: id
        }
        const { data, error } = await supabase
            .from('journals')
            .insert(newJournal)
    }
    
}

export default JournalRepo
