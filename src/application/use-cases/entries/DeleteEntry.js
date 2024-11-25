import EntriesRepo from "@/infrastructure/repositories/EntriesRepo"

const DeleteEntry = {
    async execute(entry_id){
        return EntriesRepo.deleteEntryById(entry_id)
    }
}

export default DeleteEntry