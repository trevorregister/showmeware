<template>
    {{ error }}

</template>
<script setup>

const props = defineProps({
    error: {
        required: true,
        type: Error
    }
})

</script>