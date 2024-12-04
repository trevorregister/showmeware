import Delta from 'quill-delta'

export default interface DbEntry {
    id: string,
    content: Delta,
    created_at: Date,
    journal_id: string,
    event_id: string
}