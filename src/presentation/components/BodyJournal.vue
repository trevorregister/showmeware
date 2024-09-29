<template>
    <v-row v-for="entry in journal?.entries ?? []">
        <BodyJournalEntry 
            :journalId="journal.id"
            :entryId="entry.id"
            @deleteEntry="handleDeleteEntry"
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

const emits = defineEmits(['deleteEntry', 'addEntry', 'deleteJournal'])
const props = defineProps({
    journal: {
        type: Object,
        required: true
    }
})

const addEntry = () => {
    emits('addEntry', props.journal.id)
}

const handleDeleteEntry = (entryId) => {
    props.journal.entries = props.journal.entries.filter(entry => entry.id !== entryId)
    if(props.journal.entries.length === 0){
        emits('deleteJournal', props.journal.id)
    }
}

</script>