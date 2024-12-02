<template>
    <v-color-picker
        hide-canvas
        hide-sliders
        hide-inputs
        show-swatches
        :swatches=swatches
    />
</template>
<script setup>
const red = "#FF0000"
const orange = "#FFA500"
const yellow = "#FFFF00"
const green = "#008000"
const blue = "#0000FF"
const indigo = "#4B0082"
const violet = "#EE82EE"

const swatches =  [
    [red, green],
    [orange, blue],
    [yellow, indigo]
]
</script>