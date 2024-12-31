import {
    CreateJournal,
    GetJournals,
    DeleteJournalById,
    ChangeColor,
    UpdateJournalPosition
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
    },
    async updateJournalPosition({journal, x, y}){
      return await UpdateJournalPosition.execute({journal, x, y})
    }
}

export default JournalController
