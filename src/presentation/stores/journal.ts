import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'
import { Entry, Journal } from '@/presentation/types'
import { client } from '@/application/client'
import Delta from 'quill-delta'

export const useJournalStore = defineStore('journalStore', () => {
  const journals: Ref<Journal[]> = ref([])
  const selectedJournal: Ref<Journal | null> = ref(null)
  const selectedEntry: Ref<Entry | null> = ref(null)

  const addJournal = async (journal: Journal): Promise<void> => {
    await client.journals.createJournal(journal)
    journals.value.push(journal)
  }

  const getJournals = async (): Promise<Journal[]> => {
    journals.value = await client.journals.getJournals()
    selectedJournal.value = journals.value[0] ?? null
    return journals.value
  }

  const setSelectedJournal = (journalId: string): void => {
    journals.value.forEach(j => j.circle.radius = 7)
    selectedJournal.value = journals.value.find(j => j.id === journalId) || null
    if (selectedJournal.value) {
      selectedJournal.value.circle.radius = 13
    }
  }

  const setSelectedEntry = (entryId: string): void => {
    selectedEntry.value = selectedJournal.value?.entries.find(e => e.id === entryId) || null
  }

  const addEntry = async (journalId: string): Promise<void> => {
    const journal = journals.value.find(j => j.id === journalId)
    const entry = new Entry()
    if (journal) {
      journal.entries.push(entry)
      await client.entries.createEntry({journal_id: journalId, entry})
    }
  }

  const editEntry = async ({journalId, entryId, updatedEntry}: {journalId: string, entryId: string, updatedEntry: Delta}): Promise<void> => {
    const journal = journals.value.find(j => j.id === journalId)
    if (journal) {
      const entryIndex = journal.entries.findIndex(e => e.id === entryId)
      if (entryIndex !== -1) {
        journal.entries[entryIndex].content = updatedEntry
        await client.entries.updateEntryById({entry_id: entryId, content: updatedEntry})
      }
    }
  }

  const deleteJournal = (journalId: string): void => {
    journals.value = journals.value.filter(j => j.id !== journalId)
    selectedJournal.value = journals.value[0] || null
  }

  const deleteEntry = async ({journalId, entryId}: {journalId: string, entryId: string}): Promise<void> => {
    const journal = journals.value.find(j => j.id === journalId)
    if (journal) {
      journal.entries = journal.entries.filter(e => e.id !== entryId)
      await client.entries.deleteEntryById(entryId)
    }
  }

  const getJournalById = (id: string): Journal | undefined => {
    return journals.value.find(journal => journal.id === id)
  }

  const getEntriesByJournalId = (journalId: string): Entry[] => {
    const journal = journals.value.find(journal => journal.id === journalId)
    return journal ? journal.entries : []
  }

  return {
    journals,
    selectedJournal,
    selectedEntry,
    addJournal,
    getJournals,
    addEntry,
    editEntry,
    deleteJournal,
    deleteEntry,
    getJournalById,
    getEntriesByJournalId,
    setSelectedJournal,
    setSelectedEntry
  }
})
