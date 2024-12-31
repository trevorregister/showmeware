import JournalRepo from "@/infrastructure/repositories/JournalRepo"

const UpdateJournalPosition = {
    async execute({journal, x, y}){
        return await JournalRepo.updateJournalPosition({journal, x, y})
    }
}

export default UpdateJournalPosition
