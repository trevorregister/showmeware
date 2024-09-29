import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useJournalStore = defineStore('journalStore', () => {
  const journals = ref([])
  const selectedJournal = ref(null)
  const selectedEntry = ref(null)

  const addJournal = (journal) => {
    journals.value.push(journal)
  }

  const setSelectedJournal = (journalId) => {
    selectedJournal.value = journals.value.find(j => j.id === journalId)
  }

  const setSelectedEntry = (entryId) => {
    selectedEntry.value = selectedJournal.value.entries.find(e => e.id === entryId)
  }

  const addEntry = (journalId, entry) => {
    const journal = journals.value.find(j => j.id === journalId)
    if (journal) {
      journal.entries.push(entry)
    }
  }

  const editJournal = (journalId, updatedJournal) => {
    const index = journals.value.findIndex(j => j.id === journalId)
    if (index !== -1) {
      journals.value[index] = updatedJournal
    }
  }

  const editEntry = (journalId, entryId, updatedEntry) => {
    const journal = journals.value.find(j => j.id === journalId)
    if (journal) {
      const entryIndex = journal.entries.findIndex(e => e.id === entryId)
      if (entryIndex !== -1) {
        journal.entries[entryIndex] = updatedEntry
      }
    }
  }

  const deleteJournal = (journalId) => {
    journals.value = journals.value.filter(j => j.id !== journalId)
  }

  const deleteEntry = (journalId, entryId) => {
    const journal = journals.value.find(j => j.id === journalId)
    if (journal) {
      journal.entries = journal.entries.filter(e => e.id !== entryId)
    }
  }

  const getJournalById = (id) => {
    return journals.value.find(journal => journal.id === id)
  }

  const getEntriesByJournalId = (journalId) => {
    const journal = journals.value.find(journal => journal.id === journalId)
    return journal ? journal.entries : []
  }

  return {
    journals,
    selectedJournal,
    addJournal,
    addEntry,
    editJournal,
    editEntry,
    deleteJournal,
    deleteEntry,
    getJournalById,
    getEntriesByJournalId,
    setSelectedJournal,
    setSelectedEntry
  }
})
