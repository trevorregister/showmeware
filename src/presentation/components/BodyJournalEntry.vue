<template>
    <v-container align="center" justify="center">
        <div>
        <CreateEventModal
            :modelValue="isModalOpen"
            @update:modelValue="isModalOpen = $event"
            :entryId="props.entry.id"
            />
        </div>
        <div>
        <ConfirmModal
            v-model="isConfirmModalOpen"
            @confirm="deleteEntry"
            @cancel="isConfirmModalOpen = false"
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
                        <v-icon icon="mdi-calendar-plus" @click="openModal" :disabled="props.entry.event_id? true: false"/>
                        <v-icon icon="mdi-content-save" @click="saveContent"/>
                        <v-icon icon="mdi-delete" @click="isConfirmModalOpen = true"/>
                        <div class="loader" v-if="isLoading"></div>
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
import ConfirmModal from './ConfirmModal.vue'

const editorContent = ref('')
const showEditor = ref(true)
const isModalOpen = ref(false)
const isConfirmModalOpen = ref(false)
const journalStore = useJournalStore()
const isLoading = ref(false)

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

const saveContent = async () =>{
    isLoading.value = true
    await journalStore.editEntry({
        journalId: props.journalId, 
        entryId: props.entry.id, 
        updatedEntry: editorContent.value
    })
    isLoading.value = false
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
.loader {
  width: 15px;
  aspect-ratio: 1;
  display: grid;
  color: #d8e616;
  background:
    linear-gradient(90deg,currentColor 2px,#0000 0 calc(100% - 2px),currentColor 0) center/100% 14px,
    linear-gradient(0deg, currentColor 2px,#0000 0 calc(100% - 2px),currentColor 0) center/14px 100%,
    linear-gradient(currentColor 0 0) center/100% 2px,
    linear-gradient(currentColor 0 0) center/2px 100%;
  background-repeat: no-repeat;
  animation: l6 4s infinite linear;
}
.loader::before,
.loader::after {
  content: "";
  grid-area: 1/1;
  background: inherit;
  transform-origin: inherit;
  animation: inherit;
}
.loader::after {
  animation-duration: 2s;
}
@keyframes l6{
  100% {transform:rotate(1turn)}
}
</style>