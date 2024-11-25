<template>
    <v-container>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Summary</th>
            <th class="text-center">Select</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="calendar in calendars" :key="calendar.name">
            <td>{{ calendar.name }}</td>
            <td>{{ calendar.summary }}</td>
            <td class="text-center"><confirm-button color="primary" @click="selectCalendar(calendar)" label="Select"></confirm-button></td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import ConfirmButton from '../components/ConfirmButton.vue';
  import { client } from '@/application/client'
  
  // Sample data for calendars
  const calendars = ref([
    { name: 'Work Calendar', summary: 'All work-related events and meetings', id: 1 },
    { name: 'Personal Calendar', summary: 'Personal appointments and reminders', id: 2 },
    { name: 'Family Calendar', summary: 'Family events and activities', id:3 },
    { name: 'Vacation Calendar', summary: 'Upcoming vacations and trips' , id:4},
    { name: 'Project A Calendar', summary: 'Deadlines and milestones for Project A', id: 5},
    { name: 'Fitness Calendar', summary: 'Workout schedules and fitness goals', id: 6},
  ])
  
  const selectCalendar = async (calendar) => {
    await client.profiles.updateCalendarId(calendar.id)
  }
  
  </script>