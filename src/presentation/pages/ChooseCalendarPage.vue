<template>
    <v-container>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Summary</th>
            <th class="text-center">Select</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="calendar in calendars" :key="calendar.name">
            <td>{{ calendar.summary }}</td>
            <td class="text-center"><confirm-button color="primary" @click="selectCalendar(calendar)" label="Select" ></confirm-button></td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import ConfirmButton from '../components/ConfirmButton.vue';
  import { client } from '@/application/client'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  import { useUserStore } from '@/presentation/stores/user'
  const userStore = useUserStore()
  const router = useRouter()
  // Sample data for calendars
  const calendars = ref([])
  
  const selectCalendar = async (calendar) => {
    await client.profiles.updateCalendarId(calendar.id)
    router.push('/')
  }

  onMounted(async () => {
    const session = await client.users.getSession()
    userStore.setAuthToken(session.session.provider_token)
    const authToken = userStore.getAuthToken()
    const cals = await axios.get('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    calendars.value = cals.data.items
    console.log(cals.data)

  })
  
  </script>