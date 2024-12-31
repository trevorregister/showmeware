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
    <v-row justify="center" v-if="journal?.entries.length === 0">
      <v-btn class="bg-error">
        <v-icon
          icon="mdi-book-cancel-outline"
          @click="deleteJournal"
          label="Delete Journal"
        />
      </v-btn>
    </v-row>
    <v-row v-if="journal ?? false" justify="center">
      <v-btn class="bg-accent" @click="addEntry">
        <v-icon icon="mdi-note-plus"></v-icon>
      </v-btn>
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
<style>
button {
  margin: 0.25rem;
}
</style>
