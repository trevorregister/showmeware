import JournalRepo from "@/infrastructure/repositories/JournalRepo"

const ChangeColor = {
    async execute({journal, newColor}){
        return await JournalRepo.changeColor({journal, newColor})
    }
}

export default ChangeColor