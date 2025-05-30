<template>
  <v-container align="top" justify="center">
    <v-stage
      :config="stageSize"
      @mousedown="handleStageClick"
    >
      <v-layer>
        <v-image :config="{image: image}" />
        <BodyJournalDot
          v-for="journal in journals"
          :key="journal.id"
          :config="journal.circle"
          @updateDotPosition="handleUpdateDotPosition"
        />
      </v-layer>
    </v-stage>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import BodyJournalDot from './BodyJournalDot.vue'
import { useJournalStore } from '@/presentation/stores/journal'
import { Journal } from '@/presentation/types/index'

const props = defineProps({
  imgSrc: {
    type: String,
    required: true
  },
  journals: {
    type: Array,
    required: true
  }
})
const journalStore = useJournalStore()
const journals = ref(props.journals)

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
    const newJournal = new Journal({
      x: pointerPosition.x,
      y: pointerPosition.y,
    })
    journalStore.addJournal(newJournal)
    journalStore.setSelectedJournal(newJournal.id)
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

const handleUpdateDotPosition = ({x, y}) => {
  const journal = journalStore.getSelectedJournal()
  journalStore.updateJournalPosition({journal, x, y})
}

const clickedExistingJournal = ({x, y}) => {
   return journals.value.some(journal => {
    const dx = x - journal.circle.x
    const dy = y - journal.circle.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    if(distance < journal.circle.radius + CLICK_AREA_TOLERANCE){
      journalStore.setSelectedJournal(journal.id)
      return true
    }
    return false
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

  nextTick(() => {
    journalStore.setSelectedJournal(journals.value[0].id)
  })

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
