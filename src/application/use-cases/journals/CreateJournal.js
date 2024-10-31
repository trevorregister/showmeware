import JournalRepo from "@/infrastructure/repositories/JournalRepo"

const CreateJournal = {
    async execute(journal){
        return await JournalRepo.createJournal(journal)
    }
}

export default CreateJournal