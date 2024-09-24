<template>
  <div class="image-clicker">
    <v-stage
      :config="stageSize"
      @click="handleStageClick"
    >
      <v-layer>
        <v-image :config="{image: image}" />
        <v-circle
          v-for="circle in circles"
          :key="circle.id"
          :config="circle"
        />
      </v-layer>
    </v-stage>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const stageWidth = ref(800)
const stageHeight = ref(600)
const circles = ref([])
const image = ref(null)

const stageSize = computed(() => ({
  width: 800,
  height: 600
}))

const handleStageClick = (e) => {
  const stage = e.target.getStage()
  const pointerPosition = stage.getPointerPosition()
  
  circles.value.push({
    id: Date.now().toString(),
    x: pointerPosition.x,
    y: pointerPosition.y,
    radius: 10,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 2
  })
}

const setImage = () => {
  const img = new window.Image()
  img.width = 800
  img.height = 600
  img.src = '/body.svg'

  img.onload = () =>{
    image.value = img
  }
}

onMounted(() => {
  const updateStageDimensions = () => {
    const container = document.querySelector('.image-clicker')
    if (container) {
      stageWidth.value = container.clientWidth
      stageHeight.value = container.clientWidth * (3/4) // Maintain 4:3 aspect ratio
    }
  }

  setImage()

  updateStageDimensions()
  
  window.addEventListener('resize', updateStageDimensions)

  return () => {
    window.removeEventListener('resize', updateStageDimensions)
  }

  
  
})
</script>

<style scoped>
.image-clicker {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}
</style>