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
        }
        const newEntry = {
            id: journal.entries[0].id,
            content: journal.entries[0].content,
            journal_id: journal.id,
        }
        const { data, error } = await supabase
            .from('journals')
            .insert(newJournal)
        await supabase
            .from('entries')
            .insert(newEntry)
    }
    
}

export default JournalRepo
