import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const user_id: Ref<string | null> = ref(null)

  const setUserId = (id: string) => {
    user_id.value = id
  }

  return {
    user_id,
    setUserId
  }
})
