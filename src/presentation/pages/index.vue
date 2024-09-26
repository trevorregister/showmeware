<template>
  <v-container>
    <v-row>
      <v-col class="bg-white">
        <Body 
          :imgSrc="'/body-front.svg'" 
          @addJournal="addJournal" />
      </v-col>
      <v-col>
        <BodyJournal 
          :journal="selectedJournal"    
          @addEntry="addEntry"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Body from '../components/Body.vue'
import BodyJournal from '../components/BodyJournal.vue'

const journals = ref([])

const addJournal = (newJournal) => {
  journals.value.forEach(journal => journal.show = false)
  journals.value.push(newJournal)
}

const addEntry = (journalId) => {
  journals.value.forEach(journal => {
    if(journalId === journal.id){
      journal.entries.push({
      id: Date.now().toString().concat(Math.random().toString(20).substring(2,10)),
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