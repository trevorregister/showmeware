<template>
  <v-container>
    <v-row>
      <v-col class="bg-white">
        <Body :imgSrc="'/body-front.svg'" @addJournal="addJournal"/>
      </v-col>
      <v-col>
        <BodyJournal :entries="entries" @deleteEntry="handleDeleteEntry"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Body from '../components/Body.vue'
import BodyJournal from '../components/BodyJournal.vue'

const entries = ref([])

const handleDeleteEntry = () => {
  entries.value = entries.value.filter(BodyJournalDot => BodyJournalDot.id !== 1)
}

const addJournal = (BodyJournalDot) => {
  entries.value.push(BodyJournalDot)
}

</script>