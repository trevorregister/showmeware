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
  import { useUserStore } from '@/presentation/stores/user'
  const userStore = useUserStore()
  const router = useRouter()
  const calendars = ref([])
  
  const selectCalendar = async (calendar) => {
    await client.profiles.updateCalendarId(calendar.id)
    userStore.setCalendarId(calendar.id)
    router.push('/')
  }

  onMounted(async () => {
    const token = userStore.getAuthToken()
    const calendarList = await client.calendars.getCalendars(token)
    calendars.value = calendarList.filter(cal => cal.accessRole === 'owner')
  })
  
  </script>