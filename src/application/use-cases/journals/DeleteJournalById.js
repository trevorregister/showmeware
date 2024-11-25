import JournalRepo from "@/infrastructure/repositories/JournalRepo"

const DeleteJournalById = {
    async execute(journal_id){
        return JournalRepo.deleteJournalById(journal_id)
    }
}

export default DeleteJournalById