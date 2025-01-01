<template>
  <v-container align="center" justify="center">
    <div>
    <CreateEventModal
      :modelValue="isModalOpen"
      @update:modelValue="isModalOpen = $event"
      :entryId="props.entry.id"
      :journalId="props.journalId"
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
          </v-card-actions>
          <v-card-actions v-if="hasEvent">
            <div>
              {{ props.entry.event.summary }}
            </div>
            <div>
              {{ formatEventDate(props.entry.event.start.dateTime) }}
            </div>
<!--                     <div>
              <a :href="props.entry.event.htmlLink" target="_blank"><v-icon class=nav-icon icon="mdi-navigation"/></a>
            </div> -->
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import CreateEventModal from './CreateEventModal.vue'
import { useJournalStore } from '@/presentation/stores/journal'
import { useUserStore } from '../stores/user'
import { formatEventDate } from '@/utils'
import ConfirmModal from './ConfirmModal.vue'

const editorContent = ref('')
const showEditor = ref(true)
const isModalOpen = ref(false)
const isConfirmModalOpen = ref(false)
const journalStore = useJournalStore()
const userStore = useUserStore()
const isLoading = ref(false)
const saveDisabled = ref(false)

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

const hasEvent = computed(() => {
  return props.entry.event && Object.keys(props.entry.event).length > 0
})

onMounted(() => {
  editorContent.value = props.entry.content
})

</script>

<style scoped>
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
