import JournalRepo from "@/infrastructure/repositories/JournalRepo"

const ChangeColor = {
    async execute({journal_id, newColor}){
        return await JournalRepo.changeColor({journal_id, newColor})
    }
}

export default ChangeColor