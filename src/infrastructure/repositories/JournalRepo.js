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
        const newJournal = {
            id: journal.id,
            circle: journal.circle,
        }
        const newEntry = {
            id: journal.entries[0].id,
            content: JSON.stringify(journal.entries[0].content),
            journal_id: journal.id,
        }
        const { data, error } = await supabase
            .from('journals')
            .insert(newJournal)
        await supabase
            .from('entries')
            .insert(newEntry)
    },

    async getJournals(){
        const { data, error } = await supabase
            .from('journals')
            .select('*')

        return data
    },

    async deleteJournalById(journal_id){
        const { data, error } = await supabase
            .from('journals')
            .delete()
            .eq('id', journal_id)

        await supabase
            .from('entries')
            .delete()
            .eq('journal_id', journal_id)

        return data
    },

    async changeColor({journal, newColor}){
        journal.circle.fill = newColor
        const { data, error } = await supabase
            .from('journals')
            .update({circle: journal.circle})
            .eq('id', journal.id)
        return data
    },

    async updateJournalPosition({journal, x, y}){
      journal.circle.x = x
      journal.circle.y = y
      const { data, error } = await supabase
        .from('journals')
        .update({circle: journal.circle})
        .eq('id', journal.id)
      return data
    }
}

export default JournalRepo
