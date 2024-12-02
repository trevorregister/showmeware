<template>
  <v-container>
    <v-row>
      <v-btn to="/login" @click="logout">Logout</v-btn>
    </v-row>
    <v-row>
      <v-col class="bg-white" style="height: 650px;" align="center">
        <Body 
          :imgSrc="'/woman.jpg'" 
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
import { useErrorHandler } from '../../composables/useErrorHandler'

const journalStore = useJournalStore()
const userStore = useUserStore()
const journals = ref([])
const selectedJournal = ref(null)
const renderKey = ref(0)
const { handleError } = useErrorHandler()

const handleDeleteJournal = () => {
  renderKey.value++
}

onMounted(async () => {
  
  try {
    await userStore.setAuth()
    await userStore.loadCalendars()
    const retrievedJournals = await journalStore.getJournals()
    journals.value = retrievedJournals
    selectedJournal.value = journalStore.selectedJournal
    renderKey.value++
  } catch (err) {
    handleError(err)
  }
})

const logout = async () => {
  await userStore.logout()
}
</script>