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
        event_id: entry.event_id
    }))
    return {
        circle: circle,
        id: id,
        entries: entries
    }
}