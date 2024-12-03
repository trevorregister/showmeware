<template>
    <v-color-picker
        hide-canvas
        hide-sliders
        hide-inputs
        show-swatches
        :swatches=swatches
        v-model="color"
        @click="changeColor"
        width="404px"
    />
</template>
<script setup>
const color = ref('')
const red = "#FF0000"
const orange = "#FFA500"
const yellow = "#FFFF00"
const green = "#008000"
const blue = "#0000FF"
const indigo = "#4B0082"
const violet = "#EE82EE"

/* const swatches =  [
    [red, green],
    [orange, blue],
    [yellow, indigo]
] */

const swatches = [[red], [green], [orange], [blue], [yellow], [indigo]]
const emits = defineEmits(['changeColor'])

const changeColor = () => {
    emits('changeColor', color.value)
}
</script>