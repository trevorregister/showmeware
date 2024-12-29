<template>
  <v-container>
    <v-row>
      <v-btn to="/login" @click="logout">Logout</v-btn>
    </v-row>
    <v-row>
      <v-col class="body-container bg-white" align="center">
        <Body
          :imgSrc="'/body-outline.jpeg'"
          :journals="journals"
          :key="renderKey"
        />
      </v-col>
      <v-col>
        <BodyJournal @deleteJournal="handleDeleteJournal"/>
      </v-col>
    </v-row>
    <v-row>
      <v-btn to="/choose-calendar">Choose Calendar</v-btn>
    </v-row>
  </v-container>
</template>

<script setup>
import Body from '../components/Body.vue'
import BodyJournal from '../components/BodyJournal.vue'
import { useJournalStore } from '@/presentation/stores/journal'
import { useUserStore } from '@/presentation/stores/user'

const journalStore = useJournalStore()
const userStore = useUserStore()
const journals = ref([])
const selectedJournal = ref(null)
const renderKey = ref(0)

const handleDeleteJournal = () => {
  renderKey.value++
}

onMounted(async () => {
  await userStore.setAuth()
  const retrievedJournals = await journalStore.getJournals()
  journals.value = retrievedJournals
  selectedJournal.value = journalStore.selectedJournal
  renderKey.value++
})

const logout = async () => {
  await userStore.logout()
}
</script>
<style>
.body-container {
  border-radius: 5px;
  height: 650px;
}
</style>
