import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const user_id: Ref<string | null> = ref(null)
  const authToken: Ref<string | null> = ref(null)
  const calendar_id: Ref<string | null> = ref(null)

  const setUserId = (id: string) => {
    user_id.value = id
  }

  const setAuthToken = (token: string) => {
    authToken.value = token
  }

  const setCalendarId = (id: string) => {
    calendar_id.value = id
  }

  const getCalendarId = () => {
    return calendar_id.value
  }

  const getUserId = () => {
    return user_id.value
  }

  const getAuthToken = () => {
    return authToken.value
  }

  return {
    user_id,
    setUserId,
    authToken,
    setAuthToken,
    getAuthToken,
    getUserId,
    getCalendarId,
    setCalendarId
  }
})
