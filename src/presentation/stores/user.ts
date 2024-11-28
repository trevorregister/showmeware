import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'
import { client } from '@/application/client'

export const useUserStore = defineStore('userStore', () => {
  const user_id: Ref<string | null> = ref(null)
  const authToken: Ref<string> = ref('')
  const calendar_id: Ref<string | null> = ref(null)
  const calendars: Ref<Array<object>> = ref([])

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

  const loadCalendars = async (): Promise<any> => {
    const token = localStorage.getItem('authToken') ?? ''
    const calendarList = await client.calendars.getCalendars(token)
    calendars.value = calendarList.filter(calendar => calendar.accessRole === 'owner')
    return calendars.value
  }

  const setAuth = async (): Promise<any> => {
    if(!localStorage.getItem('authToken') || localStorage.getItem('authToken') === ''){
      const session = await client.users.getSession()
      authToken.value = session.session.provider_token
      const { user } = await client.users.getMyself()
      user_id.value = user.id
      const profile = await client.profiles.getProfileByUserId(user.id)
      calendar_id.value = profile.calendar_id
      localStorage.setItem('authToken', authToken.value)
    } else {
      authToken.value = localStorage.getItem('authToken') ?? ''
    }

  }

  return {
    user_id,
    setUserId,
    authToken,
    setAuthToken,
    getAuthToken,
    getUserId,
    getCalendarId,
    setCalendarId,
    setAuth,
    loadCalendars
  }
})
