<template>
    <v-row>
        <v-col>
            <v-color-picker
                hide-canvas
                hide-sliders
                hide-inputs
                show-swatches
                :swatches=SWATCHES
                v-model="color"
                @click="changeColor"
                width="100%"
                elevation="0"
            />
        </v-col>
    </v-row>
</template>
<script setup>

const color = ref('')

const RED = "#FF0000"
const ORANGE = "#FFA500"
const YELLOW = "#FFFF00"
const GREEN = "#008000"
const BLUE = "#0000FF"
const INDIGO = "#4B0082"
const VIOLET = "#EE82EE"
const SWATCHES = [[RED], [GREEN], [ORANGE], [BLUE], [YELLOW], [INDIGO]]

const props = defineProps({
    journal: {
        required: true
    }
})
const emits = defineEmits(['changeColor'])

const changeColor = () => {
    emits('changeColor', color.value, props.journal)
}

onMounted( () => {
    color.value = props.journal.circle.fill

})
</script>