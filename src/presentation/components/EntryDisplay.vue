<template>
    <div>
        <CreateEventModal
            :modelValue="isModalOpen"
            @update:modelValue="isModalOpen = $event"
            :entryId="props.entryId"
         />
    </div>
    <v-card class="event-display bg-white">
        <QuillEditor
            :content="props.content"
            :options="displayOptions"
            :readOnly="true"
            theme="snow"
            :style="style"
        />
        <v-card-actions>
            <v-btn @click="toggleShowEditor" class="bg-accent">Edit</v-btn>
            <confirm-button label="Export to Calendar" @click="openModal"/>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import CreateEventModal from './CreateEventModal.vue'

const props = defineProps({
    content: {
        required: true,
        type: JSON
    },
    entryId: {
        required: true,
        type: String
    }
})
const isModalOpen = ref(false)
const emits = defineEmits(['toggleShowEditor'])
const displayOptions = {
    modules: {
        toolbar: false
    }
}
const openModal = () => {
    isModalOpen.value = true
}
const style = {
    height: '220px'
}
const toggleShowEditor = () => {
    emits('toggleShowEditor')
}

</script>