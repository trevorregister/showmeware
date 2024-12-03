<template>
    <v-card elevation="5">
        <ColorPicker
        @change-color="handleChangeColor"
        />
    </v-card>
</template>

<script setup>
import ColorPicker from './ColorPicker.vue'

const props = defineProps({
    journal: {
        required: true
    }
})

const handleChangeColor = (color) => {
    console.log(color)
}


</script>