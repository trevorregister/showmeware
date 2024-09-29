<template>
    <v-container align="center" justify="center">
        <v-row>
            <v-col>
                <v-card class="bg-white" v-if="showEditor">
                    <QuillEditor
                        v-model:content="editorContent"
                        :options="editorOptions"
                        theme="snow"
                        :style="style"
                    />
                    <v-card-actions>
                        <confirm-button @click="saveContent" label="Save"/>
                        <cancel-button @click="deleteEntry" label='Delete'/>
                    </v-card-actions>
                </v-card>
                <v-card class="bg-white" v-else>
                    <EntryDisplay
                        :content="savedContent"
                        @toggleShowEditor="toggleShowEditor"
                    />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import EntryDisplay from './EntryDisplay.vue'
import ConfirmButton from './ConfirmButton.vue'
import CancelButton from './CancelButton.vue'
import { useJournalStore } from '@/presentation/stores/journal'

const editorContent = ref('')
const savedContent = ref('')
const showEditor = ref(true)
const journalStore = useJournalStore()

const journal = computed(() => journalStore.selectedJournal)
const entry = computed(() => journalStore.selectedEntry)

const saveContent = () =>{
    journalStore.editEntry(journal.id, entry.id, savedContent.value)
    toggleShowEditor()
}

const deleteEntry = () => {
    console.log(journal.id, entry.id)
    journalStore.setSelectedEntry(journal.id, entry.id)
    journalStore.deleteEntry(journal.id, entry.id)
}


const editorOptions = {
    theme: 'snow',
    modules: {
        toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
        ]
},
    placeholder: 'Compose an epic...',
}

const style = {
    height: '220px'
}

const toggleShowEditor = () => {
    showEditor.value = !showEditor.value
}

</script>
  
<style scoped>

</style>