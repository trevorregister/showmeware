import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'
import { client } from '@/application/client'

export const useUserStore = defineStore('userStore', () => {
  const user_id: Ref<string> = ref('')
  const authToken: Ref<string> = ref('')
  const calendar_id: Ref<string> = ref('')
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

  const getCalendarId = (): string => {
    return calendar_id.value
  }

  const getUserId = (): string => {
    return user_id.value
  }

  const getAuthToken = (): string => {
    return authToken.value
  }

  const loadCalendars = async (): Promise<Array<object>> => {
    const token = localStorage.getItem('authToken') ?? ''
    const calendarList = await client.calendars.getCalendars(token)
    calendars.value = calendarList.filter(calendar => calendar.accessRole === 'owner')
    return calendars.value
  }

  const setAuth = async (): Promise<any> => {
    if(!localStorage.getItem('authToken') || localStorage.getItem('authToken') === ''){
      const session = await client.users.getSession()
      authToken.value = session.session.provider_token
      user_id.value = session.session.user.id
      const profile = await client.profiles.getProfileByUserId(user_id.value)
      calendar_id.value = profile.calendar_id
      localStorage.setItem('authToken', authToken.value)
    } else {
      authToken.value = localStorage.getItem('authToken') ?? ''
    }
  }

  const logout = async (): Promise<any> => {
    await client.users.signOut()
    localStorage.setItem('authToken', '')
    setAuthToken('')
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
    loadCalendars,
    logout
  }
})
