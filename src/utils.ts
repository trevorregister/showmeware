import { v4 as uuidv4 } from 'uuid'
import { DbJournal, DbEntry } from '@/infrastructure/models/index'
import { Journal } from './presentation/types'

export function generateId(): string{
    return uuidv4()
}

export function journalToWeb({DbJournal, DbEntries}: {DbJournal: DbJournal, DbEntries: Array<DbEntry>}): Journal{
    const { id, circle } = DbJournal
    const entries = DbEntries.map(entry => ({
        content: entry.content,
        id: entry.id,
        event: entry.event
    }))
    return {
        circle: circle,
        id: id,
        entries: entries
    }
}

export function formatEventDate(dateString: string): string{
  const date = new Date(dateString)
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0')
  const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM/PM

  return `${month}/${day} ${hours}:${minutes} ${ampm}` // Updated return statement
}
