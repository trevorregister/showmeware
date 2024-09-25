<template>
  <v-container>
    <v-row>
      <v-col class="bg-white">
        <Body :imgSrc="'/body-front.svg'" @addJournal="addJournal"/>
      </v-col>
      <v-col>
        <v-row v-for="entry in entries" :key="entry.id">
          <BodyJournalEntry @deleteEntry="handleDeleteEntry"/>
        </v-row>
        <v-row justify="center">
          <ConfirmButton
            :label="'Add Entry'"
            @click="addEntry"
          />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Body from '../components/Body.vue'
import BodyJournalEntry from '../components/BodyJournalEntry.vue'
import ConfirmButton from '../components/ConfirmButton.vue'

const entries = ref([])

const handleDeleteEntry = () => {
  entries.value = entries.value.filter(BodyJournalDot => BodyJournalDot.id !== 1)
}

const addJournal = (BodyJournalDot) => {
  entries.value.push(BodyJournalDot)
}

</script>