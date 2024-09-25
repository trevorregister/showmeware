<template>
  <v-container>
    <v-row>
      <v-col class="bg-white">
        <Body :imgSrc="'/body-front.svg'" @addEvent="addEntry(id)"/>
      </v-col>
      <v-col>
        <v-row>
          <ConfirmButton
            :label="'Add Entry'"
            @click="addEntry"
          />
        </v-row>
        <v-row v-for="entry in entries" :key="entry.id">
          <BodyEvent @deleteEntry="handleDeleteEntry"/>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Body from '../components/Body.vue'
import BodyEvent from '../components/BodyEvent.vue'
import ConfirmButton from '../components/ConfirmButton.vue'

const entries = ref([])

const handleDeleteEntry = () => {
  entries.value.pop()
}

const addEntry = (id) => {
  entries.value.push({id: 234})
  console.log(entries.value)
}

</script>