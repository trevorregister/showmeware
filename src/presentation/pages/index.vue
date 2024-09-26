<template>
  <v-container>
    <v-row>
      <v-col class="bg-white">
        <Body 
          :imgSrc="'/body-front.svg'" 
          @addJournal="handleAddJournal" />
      </v-col>
      <v-col>
        <BodyJournal 
          :journal="selectedJournal"    
          @addEntry="handleAddEntry"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Body from '../components/Body.vue'
import BodyJournal from '../components/BodyJournal.vue'
import { generateId } from '@/utils'

const journals = ref([])

const handleAddJournal = (newJournal) => {
  journals.value.forEach(journal => journal.show = false)
  journals.value.push(newJournal)
}

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

const selectedJournal = computed(() => {
  return journals.value.filter(journal => journal.show === true)[0] ?? []
  }
)

</script>