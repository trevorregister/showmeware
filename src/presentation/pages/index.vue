<template>
  <v-container>
    <v-row>
      <v-col class="bg-white">
        <Body 
          :imgSrc="'/woman.jpg'" 
          :journals="journals" 
          :key="renderKey"
        />
      </v-col>
      <v-col>
        <BodyJournal
          @deleteJournal="handleDeleteJournal"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Body from '../components/Body.vue'
import BodyJournal from '../components/BodyJournal.vue'
import { useJournalStore } from '@/presentation/stores/journal'

const journalStore = useJournalStore()
const journals = ref([])
const selectedJournal = ref(null)
const renderKey = ref(0)

const handleDeleteJournal = () => {
  renderKey.value++
  //journalStore.setSelectedJournal(journals.value[0])
}

onMounted(() => {
  journals.value = journalStore.journals
  selectedJournal.value = journalStore.selectedJournal
})

</script>