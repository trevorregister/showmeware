import { UpdateEntryById, CreateEntry } from "../use-cases/entries"

const EntriesController = {
    async updateEntryById({entry_id, content}){
        return UpdateEntryById.execute({entry_id, content})
    },
    async createEntry({journal_id, entry}){
        return CreateEntry.execute({journal_id, entry})
    }
}

export default EntriesController