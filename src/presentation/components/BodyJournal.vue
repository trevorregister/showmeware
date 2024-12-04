<template>
    <v-row justify="center">
        <JournalSettingsPanel :journal="journal" v-if="journal? true: false"/>
    </v-row>
    <v-row v-for="entry in journal?.entries ?? []">
        <BodyJournalEntry 
            :journalId="journal.id"
            :entry="entry"
        />
    </v-row>
    <v-row justify="center" v-if="journal?.entries">
          <ConfirmButton
            label="Add Entry"
            @click="addEntry"
          />
    </v-row>
    <v-row justify="center" v-if="journal?.entries.length === 0">
        <CancelButton 
            @click="deleteJournal" 
            label="Delete Journal" 
        />
    </v-row>
</template>
<script setup>
import BodyJournalEntry from './BodyJournalEntry.vue'
import JournalSettingsPanel from './JournalSettingsPanel.vue'
import { useJournalStore } from '@/presentation/stores/journal'

const journalStore = useJournalStore()
const journal = computed(() => journalStore.selectedJournal)

const emits = defineEmits(['deleteJournal'])


const addEntry = () => {
    journalStore.addEntry(journal.value.id)
}

const deleteJournal = () => {
    journalStore.deleteJournal(journal.value.id)
    emits('deleteJournal')
}

</script>