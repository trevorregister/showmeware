import { UpdateEntryById, CreateEntry, DeleteEntry } from "../use-cases/entries"

const EntriesController = {
    async updateEntryById({entry_id, content}){
        return UpdateEntryById.execute({entry_id, content})
    },
    async createEntry({journal_id, entry}){
        return CreateEntry.execute({journal_id, entry})
    },
    async deleteEntryById(entry_id){
        return DeleteEntry.execute(entry_id)
    }
}

export default EntriesController