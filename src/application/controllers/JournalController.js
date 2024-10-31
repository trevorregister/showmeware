import { CreateJournal } from '../use-cases/journals/index'

const JournalController = {
    async createJournal(journal) {
        return await CreateJournal.execute(journal)
    }
}

export default JournalController