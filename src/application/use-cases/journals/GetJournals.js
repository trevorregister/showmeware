import JournalRepo from "@/infrastructure/repositories/JournalRepo"
import EntriesRepo from "@/infrastructure/repositories/EntriesRepo"
import Delta from 'quill-delta'
import { journalToWeb } from '@/utils'

const GetJournals = {
    async execute(){
        const journalsToWeb = []
        const journals = await JournalRepo.getJournals()
        for await (const journal of journals){
            const entries = await EntriesRepo.getEntriesByJournalId(journal.id)
            entries.forEach(entry => entry.content = new Delta(entry.content))
            journalsToWeb.push(journalToWeb({DbJournal: journal, DbEntries: entries}))
        }
        console.log('journalsToWeb', journalsToWeb)
        return journalsToWeb
    }
}

export default GetJournals