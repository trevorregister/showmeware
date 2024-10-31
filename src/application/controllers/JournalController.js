import { CreateJournal, GetJournals } from '../use-cases/journals/index'

const JournalController = {
    async createJournal(journal) {
        return await CreateJournal.execute(journal)
    },
    async getJournals() {
        return await GetJournals.execute()
    }
}

export default JournalController