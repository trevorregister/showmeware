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
      <v-btn to="/choose-calendar">Choose Calendar</v-btn>
    </v-row>
  </v-container>
</template>

<script setup>
import Body from '../components/Body.vue'
import BodyJournal from '../components/BodyJournal.vue'
import { useJournalStore } from '@/presentation/stores/journal'
import { client } from '@/application/client'
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
  const retrievedJournals = await journalStore.getJournals()
  journals.value = retrievedJournals
  selectedJournal.value = journalStore.selectedJournal

  const session = await client.users.getSession()
  userStore.setAuthToken(session.session.provider_token)
  const { user } = await client.users.getMyself()
  userStore.setUserId(user.id)
  const profile = await client.profiles.getProfileByUserId(user.id)
  userStore.setCalendarId(profile.calendar_id)

  renderKey.value++
})

const logout = async () => {
  await client.users.signOut()
}
</script>