<template>
    <v-row v-for="entry in journal?.entries ?? []" :key="journal.id">
        <BodyJournalEntry/>
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

const emits = defineEmits(['deleteEntry'])
const props = defineProps({
    journal: {
        type: Object,
        required: true
    }
})
</script>