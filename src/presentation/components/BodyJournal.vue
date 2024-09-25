<template>
    <v-row v-for="entry in entries" :key="entry.id">
        <BodyJournalEntry @deleteEntry="handleDeleteEntry"/>
    </v-row>
    <v-row justify="center" v-if="entries.length > 0">
          <ConfirmButton
            label="Add Entry"
            @click="addEntry"
          />
    </v-row>
</template>
<script setup>
import BodyJournalEntry from './BodyJournalEntry.vue'

const emits = defineEmits(['deleteEntry'])
const props = defineProps({
    entries: {
        type: Array,
        required: true
    }
})

const handleDeleteEntry = () =>{
    emits('deleteEntry')
}
</script>