<template>
    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">
          {{ title }}
        </v-card-title>
        <v-card-text>
          {{ message }}
        </v-card-text>
        <div style="display: flex; margin-left: 0.75rem;">
          <v-checkbox
            v-if="props.eventId"
            label="Delete calendar event"
            v-model="deleteEvent"
            />
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <cancel-button @click="onCancel" :label="cancelText"/>
          <confirm-button @click="onConfirm" :label="confirmText"/>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>

  <script setup>
  import { ref, watch, defineProps, defineEmits } from 'vue'

  const deleteEvent = ref(false)

  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: 'Confirm'
    },
    message: {
      type: String,
      default: 'Are you sure?'
    },
    confirmText: {
      type: String,
      default: 'Confirm'
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    eventId: {
      type: String,
      required: false
    }
  })

  const emit = defineEmits(['update:modelValue', 'confirm', 'cancel', 'deleteEvent'])

  const dialog = ref(props.modelValue)

  watch(() => props.modelValue, (newValue) => {
    dialog.value = newValue
  })

  watch(dialog, (newValue) => {
    emit('update:modelValue', newValue)
  })

  const onConfirm = () => {
    emit('confirm')
    if(deleteEvent.value){
      emit('deleteEvent')
    }
    closeModal()
  }

  const onCancel = () => {
    emit('cancel')
    closeModal()
  }

  const closeModal = () => {
    emit('update:modelValue', false)
  }
  </script>

