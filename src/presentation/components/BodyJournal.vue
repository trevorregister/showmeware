<template>
    <v-row v-for="entry in journal?.entries ?? []">
        <BodyJournalEntry 
            :journalId="journal.id"
            :entry="entry"
        />
    </v-row>
    <v-row justify="center" v-if="journal?.entries.length > 0">
          <ConfirmButton
            label="Add Entry"
            @click="addEntry"
          />
    </v-row>
</template>
<script setup>
import BodyJournalEntry from './BodyJournalEntry.vue'
import { useJournalStore } from '@/presentation/stores/journal'
import { generateId } from '@/utils'
import Delta from 'quill-delta'
const journalStore = useJournalStore()
const journal = computed(() => journalStore.selectedJournal)


const addEntry = () => {
    journalStore.addEntry(journal.value.id, {
        id: generateId(),
        content: new Delta()
    })
}

</script>