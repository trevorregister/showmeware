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

const emits = defineEmits(['deleteEntry', 'addEntry'])
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
    console.log('delete this', entryId)
    props.journal.entries.forEach(entry => console.log('before', entry.id))
    props.journal.entries = props.journal.entries.filter(entry => entry.id !== entryId)
    props.journal.entries.forEach(entry => console.log('after', entry.id))
}

</script>