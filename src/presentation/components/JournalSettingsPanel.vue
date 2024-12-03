<template>
    <div class="settings-panel">
        <v-expansion-panels>
            <v-expansion-panel title="Journal Settings" elevation="5">
                <v-expansion-panel-text>
                    <div class="color-picker">
                        <ColorPicker
                        :journal="journal"
                        @change-color="handleChangeColor"
                            />
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script setup>
import ColorPicker from './ColorPicker.vue'

const props = defineProps({
    journal: {
        required: true
    }
})

const handleChangeColor = (color, journalId) => {
    console.log(color, journalId)
}
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