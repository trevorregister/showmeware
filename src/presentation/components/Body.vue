<template>
    <v-btn @click=clearDots>Clear Dots</v-btn>
    <v-container class="image-container" @click="handleClick">
    <v-img src="../assets/body.svg" class="background-image"/>
    <div
        v-for="(dot, index) in dots"
        :key="index"
        class="dot"
        :style="{ top: `${dot.y}px`, left: `${dot.x}px` }"
    ></div>
    </v-container>
</template>

<script setup>
const dots = ref([])

function handleClick(event) {
      const rect = event.currentTarget.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      dots.value.push({ x, y })

    }
function clearDots(){
    dots.value = []
}
</script>
<style scoped>
.image-container {
  position: relative;
  width: 100%;
  height: 500px;
  background-color: #f0f0f0;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: scale-down;
}
.dot {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  pointer-events: none; /* Ensure dot doesn't block clicks */
}
</style>