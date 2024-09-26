<template>
  <v-container align="top" justify="center">
    <v-stage
      :config="stageSize"
      @click="addJournal"
    >
      <v-layer>
        <v-image :config="{image: image}" />
        <BodyJournalDot
          v-for="circle in circles"
          :key="circle.id"
          :config="circle"
        />
      </v-layer>
    </v-stage>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import BodyJournalDot from './BodyJournalDot.vue'
import { generateId } from '@/utils'

const props = defineProps({
  imgSrc: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['addJournal'])

const stageWidth = ref(400)
const stageHeight = ref(600)
const circles = ref([])
const image = ref(null)

const stageSize = computed(() => ({
  width: stageWidth.value,
  height: stageHeight.value
}))

const addJournal = (e) => {
  const stage = e.target.getStage()
  const pointerPosition = stage.getPointerPosition()

  const newJournal = {
    id: generateId(),
    x: pointerPosition.x,
    y: pointerPosition.y,
    radius: 10,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 2,
    show: true,
    entries: [{
      id: generateId(),
      content: {ops: []}
    }]
  }
  circles.value.push(newJournal)
  emits('addJournal', newJournal)
}

const setImage = () => {
  const img = new window.Image()
  img.width = stageSize.value.width
  img.height = stageSize.value.height
  img.src = props.imgSrc

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