<template>
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
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const props = defineProps({
    content: {
        required: true,
        type: JSON
    }
})
const emits = defineEmits(['toggleShowEditor'])
const displayOptions = {
    modules: {
        toolbar: false
    }
}
const style = {
    height: '220px'
}
const toggleShowEditor = () => {
    emits('toggleShowEditor')
}

</script>