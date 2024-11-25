import EntriesRepo from "@/infrastructure/repositories/EntriesRepo"

const UpdateEntryById = {
    async execute({entry_id, content}){
        return await EntriesRepo.updateEntryById({entry_id, content})
    }
}

export default UpdateEntryById