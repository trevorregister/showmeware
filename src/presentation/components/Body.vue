<template>
  <v-container align="top" justify="center">
    <v-stage
      :config="stageSize"
      @click="handleStageClick"
    >
      <v-layer>
        <v-image :config="{image: image}" />
        <BodyJournalDot
          v-for="journal in journals"
          :key="journal.id"
          :config="journal.circle"
        />
      </v-layer>
    </v-stage>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import BodyJournalDot from './BodyJournalDot.vue'
import { generateId } from '@/utils'
import { useJournalStore } from '@/presentation/stores/journal'

const props = defineProps({
  imgSrc: {
    type: String,
    required: true
  }
})
const journalStore = useJournalStore()
const emits = defineEmits(['createJournal'])
const journals = ref([])

const stageWidth = ref(400)
const stageHeight = ref(600)
const image = ref(null)
const CLICK_AREA_TOLERANCE = 7

const stageSize = computed(() => ({
  width: stageWidth.value,
  height: stageHeight.value
}))

const handleStageClick = (e) => {
  const stage = e.target.getStage()
  const pointerPosition = stage.getPointerPosition()

  if(clickedExistingJournal(pointerPosition)){
    return
  }
  else{
    const newJournal = {
    id: generateId(),
    circle: {
      x: pointerPosition.x,
      y: pointerPosition.y,
      radius: 10,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 2,
    },
    entries: [{
      id: generateId(),
      content: {ops: []}
      }]
    }
    journalStore.addJournal(newJournal)
    emits('createJournal', newJournal)
  }
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

const clickedExistingJournal = ({x, y}) => {
  return journals.value.some(journal => {
    const dx = x - journal.circle.x
    const dy = y - journal.circle.y
    const distance = Math.sqrt(dx * dx + dy * dy) 
    return distance < journal.circle.radius + CLICK_AREA_TOLERANCE
  })
}

onMounted(() => {
  const updateStageDimensions = () => {
    const container = document.querySelector('.image-clicker')
    if (container) {
      stageWidth.value = container.clientWidth
      stageHeight.value = container.clientWidth * (3/4) // Maintain 4:3 aspect ratio
    }
  }

  journals.value = journalStore.journals
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