import EntriesRepo from "@/infrastructure/repositories/EntriesRepo"

const CreateEntry = {
    async execute({journal_id, entry}){
        return EntriesRepo.createEntry({journal_id, entry})
    }
}

export default CreateEntry