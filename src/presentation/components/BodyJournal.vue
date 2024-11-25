<template>
    <div>
        <v-btn @click="openModal">Create Event</v-btn>
        <CreateEventModal
            :modelValue="isModalOpen"
            @update:modelValue="isModalOpen = $event"
        />
    </div>
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
import { useJournalStore } from '@/presentation/stores/journal'
import CreateEventModal from './CreateEventModal.vue'

const journalStore = useJournalStore()
const journal = computed(() => journalStore.selectedJournal)
const isModalOpen = ref(false)

const emits = defineEmits(['deleteJournal'])


const addEntry = () => {
    journalStore.addEntry(journal.value.id)
}

const openModal = () => {
    isModalOpen.value = true
}

const deleteJournal = () => {
    journalStore.deleteJournal(journal.value.id)
    emits('deleteJournal')
}

</script>