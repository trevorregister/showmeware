<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Add New Event</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="title"
                label="Event Title*"
                required
                :rules="[v => !!v || 'Title is required']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="description"
                label="Event Description"
                rows="3"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="startDate"
                label="Start Date"
                type="date"
                required
                :rules="[v => !!v || 'Start date is required']"
                @input="setEndDate"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="startTime"
                label="Start Time"
                type="time"
                required
                :rules="[v => !!v || 'Start time is required']"
                @input="setEndTime(startTime)"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="endDate"
                label="End Date"
                type="date"
                required
                :rules="[v => !!v || 'End date is required']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="endTime"
                label="End Time"
                type="time"
                required
                :rules="[v => !!v || 'End time is required']"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <cancel-button label="Close" @click="closeModal"/>
        <confirm-button label="Save" @click="submitForm"/>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineEmits, defineProps, watch } from 'vue'
import CancelButton from './CancelButton.vue'
import ConfirmButton from './ConfirmButton.vue'
import { useUserStore } from '@/presentation/stores/user'
import { useJournalStore } from '@/presentation/stores/journal'
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  entryId: {
    type: String,
    required: true
  },
  journalId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const dialog = ref(props.modelValue)
const title = ref('')
const description = ref('')
const startDate = ref('')
const startTime = ref('')
const endDate = ref('')
const endTime = ref('')
const userStore = useUserStore()
const journalStore = useJournalStore()

watch(() => props.modelValue, (newValue) => {
  dialog.value = newValue
})

const setEndDate = () => {
  endDate.value = startDate.value
}

const setEndTime = (startTime) => {
  const hours = startTime.split(':')[0]
  const minutes = startTime.split(':')[1]
  endTime.value = `${parseInt(hours)+1}:${minutes}`
}

watch(dialog, (newValue) => {
  emit('update:modelValue', newValue)
})

const closeModal = () => {
  emit('update:modelValue', false)
}

const submitForm = async () => {
  if (validateForm()) {
    const event = {
      start: {
        dateTime: `${startDate.value}T${startTime.value}:00`,
        timeZone: 'America/New_York'
      },
      end: {
        dateTime: `${endDate.value}T${endTime.value}:00`,
        timeZone: 'America/New_York'
      },
      summary: title.value,
      description: description.value
    }

    const calendarId = userStore.getCalendarId()
    const token = userStore.getAuthToken()
    journalStore.createEvent({
      token: token,
      calendarId: calendarId,
      event: event,
      entryId: props.entryId,
      journalId: props.journalId
    })
    closeModal()
    resetForm()
  }
}

const validateForm = () => {
  return title.value && startDate.value && startTime.value && endDate.value && endTime.value
}

const resetForm = () => {
  title.value = ''
  description.value = ''
  startDate.value = ''
  startTime.value = ''
  endDate.value = ''
  endTime.value = ''
}
</script>
