import { 
    CreateJournal, 
    GetJournals, 
    DeleteJournalById,
    ChangeColor 
} from '../use-cases/journals/index'

const JournalController = {
    async createJournal(journal) {
        return await CreateJournal.execute(journal)
    },
    async getJournals() {
        return await GetJournals.execute()
    },
    async deleteJournalById(journal_id){
        return await DeleteJournalById.execute(journal_id)
    },
    async changeColor({journal, newColor}){
        return await ChangeColor.execute({journal, newColor}) 
    }
}

export default JournalController