import supabase from "../database/database-service"

const EntriesRepo = {
    async getEntriesByJournalId(journal_id){
        const { data, error } = await supabase
            .from('entries')
            .select('*')
            .eq('journal_id', journal_id)

        return data
    },
    async updateEntryById({entry_id, content}){
        const { data, error } = await supabase
            .from('entries')
            .update({ content })
            .eq('id', entry_id)
        return data
    },
    async addEventIdToEntry({entry_id, event_id}){
        const { data, error } = await supabase
            .from('entries')
            .update({ event_id })
            .eq('id', entry_id)
        return data
    },
    async createEntry({journal_id, entry}){
        const newEntry = {
            id: entry.id,
            content: JSON.stringify(entry.content),
            journal_id: journal_id,
        }

        const { data, error } = await supabase
            .from('entries')
            .insert(newEntry)

        return data
    },

    async deleteEntryById(entry_id){
        const { data, error } = await supabase
            .from('entries')
            .delete()
            .eq('id', entry_id)
        return data
    }
}

export default EntriesRepo
