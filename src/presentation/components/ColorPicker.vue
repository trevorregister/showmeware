<template>
    <v-row>
        <v-col>
            {{journal.id}}
        </v-col>
    </v-row>
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
    emits('changeColor', color.value, props.journal.id)
}

function toHex(colorName) { //remove after converting journal circles to hex
    switch (colorName.toLowerCase()) {
        case 'red':
            return RED
        case 'orange':
            return ORANGE
        case 'yellow':
            return YELLOW
        case 'green':
            return GREEN
        case 'blue':
            return BLUE
        case 'indigo':
            return INDIGO
        case 'violet':
            return VIOLET
        default:
            return "Invalid color name"
    }
}

onMounted( () => {
    console.log('before', color.value)
    color.value = toHex(props.journal.circle.fill)
    console.log('after', color.value)

})
</script>