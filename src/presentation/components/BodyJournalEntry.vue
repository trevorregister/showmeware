<template>
    <v-container align="center" justify="center">
        <div>
        <CreateEventModal
            :modelValue="isModalOpen"
            @update:modelValue="isModalOpen = $event"
            :entryId="props.entry.id"
            @submit="toggleHasEvent"
            />
        </div>
        <div>
        <ConfirmModal
            v-model="isConfirmModalOpen"
            :eventId = "props.entry.event?.id ?? null"
            @confirm="deleteEntry"
            @deleteEvent="deleteEvent"
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
                        @textChange="enableSave"
                    />
                    <v-card-actions>
                        <v-icon icon="mdi-calendar-plus" @click="openModal" :disabled="hasEvent"/>
                        <v-icon icon="mdi-content-save" @click="saveContent" :disabled="saveDisabled"/>
                        <div style="display: flex; margin-left: auto;">
                            <v-icon icon="mdi-delete" @click="isConfirmModalOpen = true"/>
                        </div>
<!--                         <div class="loader" v-if="isLoading"></div> -->
                    </v-card-actions>
                    <v-card-actions v-if="props.entry.event">
                      <div>
                        {{ props.entry.event?.summary ?? '' }}
                      </div>
                      <div>
                        {{ formatEventDate(props.entry.event?.start.dateTime) }}
                      </div>
                      <div>
                        <a :href="props.entry.event?.htmlLink" target="_blank"><v-icon class=nav-icon icon="mdi-navigation"/></a>
                      </div>
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
import { useJournalStore } from '@/presentation/stores/journal'
import { useUserStore } from '../stores/user'
import { formatEventDate } from '@/utils'
import ConfirmModal from './ConfirmModal.vue'
import { client } from '@/application/client'

const editorContent = ref('')
const showEditor = ref(true)
const isModalOpen = ref(false)
const isConfirmModalOpen = ref(false)
const journalStore = useJournalStore()
const userStore = useUserStore()
const isLoading = ref(false)
const saveDisabled = ref(false)
const hasEvent = ref(false)

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

const toggleHasEvent = () => {
  hasEvent.value = !hasEvent.value
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
    saveDisabled.value = true
}
const openModal = () => {
    isModalOpen.value = true
}
const editContent = (content) => {
    editorContent.value = content
}
const enableSave = () => {
  saveDisabled.value = false
}
const deleteEvent = () => {
  const calendarId = userStore.getCalendarId()
  userStore.deleteEventById({
    calendarId: calendarId,
    eventId: props.entry.event.id
  })
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

const eventUrl = () => {
  return `https://calendar.google.com/calendar/u/0/r/eventedit/${props.entry.event.id}`
}

onMounted(() => {
    editorContent.value = props.entry.content
    hasEvent.value = props.entry.event ? true:  false
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
.nav-icon{
  transform: rotate(90deg);
}
.nav-icon:hover{
  cursor: pointer;
}
a {
  text-decoration: none;
  color: black
}
</style>
