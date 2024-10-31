import JournalRepo from "@/infrastructure/repositories/JournalRepo"

const GetJournals = {
    async execute(){
        return await JournalRepo.getJournals()
    }
}

export default GetJournals