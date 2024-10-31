<template>
  <v-container>
    <v-row>
      <v-btn to="/login" @click="logout">Logout</v-btn>
    </v-row>
    <v-row>
      <v-col class="bg-white">
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
      <v-btn @click="getCalendars">Cal</v-btn>
    </v-row>
    <v-row>
      <v-btn to="/choose-calendar">Choose Calendar</v-btn>
    </v-row>
    <v-row>
      <v-btn @click="updateCalendarId">Update Calendar</v-btn>
    </v-row>
  </v-container>
</template>

<script setup>
import Body from '../components/Body.vue'
import BodyJournal from '../components/BodyJournal.vue'
import { useJournalStore } from '@/presentation/stores/journal'
import { client } from '@/application/client'

const journalStore = useJournalStore()
const journals = ref([])
const selectedJournal = ref(null)
const renderKey = ref(0)

const handleDeleteJournal = () => {
  renderKey.value++
}

onMounted(() => {
  journals.value = journalStore.journals
  selectedJournal.value = journalStore.selectedJournal
})

const logout = async () => {
  await client.users.signOut()
}

const getCalendars = async () => {
    const {session } = await client.users.getSession()
    const calendars = await client.users.getCalendars(session.provider_token)
    console.log(calendars)
}
</script>