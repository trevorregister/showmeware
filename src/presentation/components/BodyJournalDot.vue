<template>
    <v-circle
        :config="props.config"
    />
</template>

<script setup>
    const props = defineProps({
        config: {
            x: {
                type: Number,
                required: true
            },
            y: {
                type: Number,
                required: true
            },
            radius: {
                type: Number,
                default: 10
            },
            fill: {
                type: String,
                default: '#008000'
            },
            strokeWidth: {
                type: Number,
                default: 2
            },
            id: {
                type: String,
                required: true
            }
        }
    })

</script>