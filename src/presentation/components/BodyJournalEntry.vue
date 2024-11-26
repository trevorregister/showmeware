<template>
    <v-container align="center" justify="center">
        <div>
        <CreateEventModal
            :modelValue="isModalOpen"
            @update:modelValue="isModalOpen = $event"
            :entryId="props.entry.id"
            />
        </div>
        <v-row>
            <v-col>
                <v-card class="bg-white" v-if="showEditor" elevation="5">
                    <QuillEditor
                        :content="props.entry.content"
                        :options="EDITOR_OPTIONS"
                        theme="snow"
                        :style="EDITOR_STYLE"
                        @update:content="editContent"
                        @blur="saveContent"
                    />
                    <v-card-actions>
                        <confirm-button @click="openModal" label="+ Event" :disabled="props.entry.event_id"/>
                        <cancel-button @click="deleteEntry" label='Delete'/>
                    </v-card-actions>
                </v-card>
<!--                 <v-card class="bg-white" v-else>
                    <EntryDisplay
                        :content="props.entry.content"
                        @toggleShowEditor="toggleShowEditor"
                        :entryId="props.entry.id"
                    />
                </v-card> -->
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import EntryDisplay from './EntryDisplay.vue'
import CreateEventModal from './CreateEventModal.vue'
import ConfirmButton from './ConfirmButton.vue'
import CancelButton from './CancelButton.vue'
import { useJournalStore } from '@/presentation/stores/journal'

const editorContent = ref('')
const showEditor = ref(true)
const isModalOpen = ref(false)
const journalStore = useJournalStore()

const props = defineProps({
    journalId: {
        type: String,
        required: true
    },
    entry: {
        type: Object,
        required: true
    }
})

const EDITOR_OPTIONS = {
    theme: 'snow',
    modules: {
        toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
        ]
    },
    placeholder: 'Start typing...',
}

const EDITOR_STYLE = {
    height: '120px'
}

const saveContent = () =>{
    journalStore.editEntry({
        journalId: props.journalId, 
        entryId: props.entry.id, 
        updatedEntry: editorContent.value
    })
    //showEditor.value = !showEditor.value
}
const openModal = () => {
    isModalOpen.value = true
}
const editContent = (content) => {
    editorContent.value = content
}

const deleteEntry = () => {
    journalStore.deleteEntry({
        journalId: props.journalId, 
        entryId: props.entry.id
    })
}

const toggleShowEditor = () => {
    showEditor.value = !showEditor.value
}

onMounted(() => {
    editorContent.value = props.entry.content
})

</script>
  
<style scoped>

</style>