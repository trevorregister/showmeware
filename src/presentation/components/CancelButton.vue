<template>
    <v-btn class="bg-error">{{ label }}</v-btn>
</template>
<script setup>
const props = defineProps({
    label: {
        type: String,
        required: true
    }
})

</script>