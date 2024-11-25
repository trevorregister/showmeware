import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const user_id: Ref<string | null> = ref(null)
  const authToken: Ref<string | null> = ref(null)

  const setUserId = (id: string) => {
    user_id.value = id
  }

  const setAuthToken = (token: string) => {
    authToken.value = token
  }

  const getAuthToken = () => {
    return authToken.value
  }

  return {
    user_id,
    setUserId,
    authToken,
    setAuthToken,
    getAuthToken
  }
})
