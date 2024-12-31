<template>
    <v-circle
        :config="props.config"
        :draggable="true"
        @dragend="updateDotPosition"
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

  const emits = defineEmits(['stopDrag'])

  const updateDotPosition = (e) => {
    const dot = e.target
    const { x, y} = dot.attrs
    emits('updateDotPosition',{x: x, y: y})
  }

</script>
