<template>
  <v-container>
    <v-row>
      <v-col class="bg-white">
        <Body :imgSrc="'/body-front.svg'" />
      </v-col>
      <v-col>
        <BodyJournal 
          :journal="selectedJournal"    
          @addEntry="handleAddEntry"
          />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Body from '../components/Body.vue'
import BodyJournal from '../components/BodyJournal.vue'
import { generateId } from '@/utils'
import { useJournalStore } from '@/presentation/stores/journal'

const journalStore = useJournalStore()
const journals = ref([])
const selectedJournal = ref(null)

const handleAddEntry = (journalId) => {
  journals.value.forEach(journal => {
    if(journalId === journal.id){
      journal.entries.push({
      id: generateId(),
      content: {ops: []}
      })
    }
  })
}

onMounted(() => {
  journals.value = journalStore.journals
  selectedJournal.value = journalStore.selectedJournal
})

</script>