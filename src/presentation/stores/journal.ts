import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'
import { Entry, Journal } from '@/presentation/types'
import { client } from '@/application/client'
import Delta from 'quill-delta'
import { useErrorHandler } from '../../composables/useErrorHandler'


export const useJournalStore = defineStore('journalStore', () => {
  const journals: Ref<Journal[]> = ref([])
  const selectedJournal: Ref<Journal | null> = ref(null)
  const selectedEntry: Ref<Entry | null> = ref(null)
  const { handleError } = useErrorHandler()


  const addJournal = async (journal: Journal): Promise<void> => {
    try {
      await client.journals.createJournal(journal)
      journals.value.push(journal)
    } catch (err) {
      handleError(err)
    }
  }

  const changeColor = async ({journal, newColor}: {journal: Journal, newColor: string}): Promise<void> => {
    const journalToUpdate = journals.value.find(j => j.id === journal.id)
    if (journalToUpdate) {
      try {
        await client.journals.changeColor({
          journal: journal,
          newColor: newColor
        })
        journal.circle.fill = newColor
      } catch (err) {
        handleError(err)
      }
    }
  }

  const getJournals = async (): Promise<Journal[]> => {
    try {
      journals.value = await client.journals.getJournals()
      selectedJournal.value = journals.value[0] ?? null
    } catch (err) {
      handleError(err)
    }
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
      try {
        journal.entries.push(entry)
        await client.entries.createEntry({journal_id: journalId, entry})
      } catch (err) {
        handleError(err)
      }
    }
  }

  const editEntry = async ({journalId, entryId, updatedEntry}: {journalId: string, entryId: string, updatedEntry: Delta}): Promise<void> => {
    const journal = journals.value.find(j => j.id === journalId)
    if (journal) {
      const entryIndex = journal.entries.findIndex(e => e.id === entryId)
      if (entryIndex !== -1) {
        try {
          journal.entries[entryIndex].content = updatedEntry
          await client.entries.updateEntryById({entry_id: entryId, content: updatedEntry})
        } catch (err) {
          handleError(err)
        }
      }
    }
  }

  const deleteJournal = async (journalId: string): Promise<void> => {
    try {
      journals.value = journals.value.filter(j => j.id !== journalId)
      await client.journals.deleteJournalById(journalId)
      selectedJournal.value = journals.value[0] || null
    } catch (err) {
      handleError(err)
    }
  }

  const deleteEntry = async ({journalId, entryId}: {journalId: string, entryId: string}): Promise<void> => {
    const journal = journals.value.find(j => j.id === journalId)
    if (journal) {
      try {
        journal.entries = journal.entries.filter(e => e.id !== entryId)
        await client.entries.deleteEntryById(entryId)
      } catch (err) {
        handleError(err)
      }
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
    setSelectedEntry,
    changeColor
  }
})
