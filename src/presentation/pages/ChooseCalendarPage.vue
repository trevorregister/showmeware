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
      <confirm-button color="primary" @click="createEvent" label="Create Event" ></confirm-button>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import ConfirmButton from '../components/ConfirmButton.vue';
  import { client } from '@/application/client'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/presentation/stores/user'
  const userStore = useUserStore()
  const router = useRouter()
  const calendars = ref([])
  
  const selectCalendar = async (calendar) => {
    await client.profiles.updateCalendarId(calendar.id)
    router.push('/')
  }

  const createEvent = async () => {
    const calendarId = userStore.getCalendarId()
    const token = userStore.getAuthToken()
    const event = {
      start: {
        dateTime: '2024-11-25T10:00:00',
        timeZone: 'America/New_York'
      },
      end: {
        dateTime: '2024-11-25T11:00:00',
        timeZone: 'America/New_York'
      },
      summary: 'Test Event'
    }
    await client.calendars.createEvent({
      token: token, 
      calendarId: calendarId, 
      event: event
    })
  }

  onMounted(async () => {
    const token = userStore.getAuthToken()
    const calendarList = await client.calendars.getCalendars(token)
    calendars.value = calendarList.filter(cal => cal.accessRole === 'owner')
  })
  
  </script>