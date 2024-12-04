<template>
    <div class="settings-panel">
        <v-expansion-panels>
            <v-expansion-panel title="Journal Settings" elevation="5">
                <v-expansion-panel-text>
                    <v-row>
                        <v-col align="center">
                            {{ journal.id }}
                        </v-col>
                    </v-row>
                    <div class="color-picker">
                        <ColorPicker
                        :journal="journal"
                        @change-color="handleChangeColor"
                        :key="renderKey"
                        />
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script setup>
import ColorPicker from './ColorPicker.vue'
import { useJournalStore } from '../stores/journal'

const props = defineProps({
    journal: {
        required: true
    }
})

const journalStore = useJournalStore()
const renderKey = ref(0)

const handleChangeColor = (color, journal) => {
    journalStore.changeColor({
        journal: journal, 
        newColor: color
    })
}

watch( 
    () => props.journal,
    () => {
        renderKey.value++
    }

)
</script>
<style>
.color-picker {
    display: flex;
    flex-wrap: wrap;
    justify-content: center; 
}
.settings-panel {
    display: flex;
    width: 90%;
}
</style>