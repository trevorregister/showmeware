<template>
  <v-container>
    <v-row>
      <v-col class="bg-white">
        <Body :imgSrc="'/body-front.svg'" @addJournal="addJournal"/>
      </v-col>
      <v-col>
        <BodyJournal :journal="selectedJournal"/>
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

const selectedJournal = computed(() => {
  console.log(selectedJournal.value)
  console.log('journals', journals.value)
  return journals.value.filter(journal => journal.show === true)[0] ?? []
  }
)

</script>