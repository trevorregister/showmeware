import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'
import { client } from '@/application/client'
import { useErrorHandler } from '../../composables/useErrorHandler'

export const useUserStore = defineStore('userStore', () => {
  const user_id: Ref<string> = ref('')
  const authToken: Ref<string> = ref('')
  const calendar_id: Ref<string> = ref('')
  const calendars: Ref<Array<object>> = ref([])
  const { handleError } = useErrorHandler()

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

  const getCalendars = (): Array<object> => {
    return calendars.value
  }

  const loadCalendars = async (): Promise<Array<object>> => {
    try {
      const token = localStorage.getItem('authToken') ?? ''
      const calendarList = await client.calendars.getCalendars(token)
      calendars.value = calendarList.filter(calendar => calendar.accessRole === 'owner')
    } catch (err) {
      handleError(err)
    }
    return calendars.value
  }

  const deleteEventById = async ({calendarId, eventId}: {calendarId: string, eventId: string}): Promise<void> => {
    try {
      const token = localStorage.getItem('authToken') ?? ''
      await client.calendars.deleteEventById({
        token: token,
        eventId: eventId,
        calendarId: calendarId
      })
    } catch (err) {
      handleError(err)
    }
  }

  const setAuth = async (): Promise<any> => {
      try {
        const session = await client.users.getSession()
        authToken.value = session.session.provider_token
        user_id.value = session.session.user.id
/*         const profile = await client.profiles.getProfileByUserId(user_id.value)
        calendar_id.value = profile.calendar_id */
        localStorage.setItem('authToken', authToken.value)
      } catch (err) {
        handleError(err)
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
    logout,
    getCalendars,
    deleteEventById
  }
})
