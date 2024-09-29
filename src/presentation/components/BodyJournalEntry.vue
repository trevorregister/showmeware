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
                    <v-card-text>
                        {{ editorContent }}
                        <br>
                         {{ props.journalId }} 
                         <br>
                         {{ props.entry.id }} 
                    </v-card-text>
                    <v-card-actions>
                        <confirm-button @click="saveContent" label="Save"/>
                        <cancel-button @click="deleteEntry" label='Delete'/>
                    </v-card-actions>
                </v-card>
<!--                 <v-card class="bg-white" v-else>
                    <EntryDisplay
                        :content="savedContent"
                        @toggleShowEditor="toggleShowEditor"
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
import ConfirmButton from './ConfirmButton.vue'
import CancelButton from './CancelButton.vue'
import { useJournalStore } from '@/presentation/stores/journal'

const editorContent = ref('')
const savedContent = ref('')
const showEditor = ref(true)
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

const saveContent = () =>{
    console.log('saveContent', editorContent.value)
    journalStore.editEntry({
        journalId: props.journalId, 
        entryId: props.entry.id, 
        updatedEntry: editorContent.value
    })
}

const deleteEntry = () => {
    journalStore.deleteEntry(props.journalId, props.entryId)
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

onMounted(() => {
    editorContent.value = props.entry.content
})

</script>
  
<style scoped>

</style>