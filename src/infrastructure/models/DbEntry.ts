import Delta from 'quill-delta'

export default interface DbEntry {
    id: String,
    content: Delta,
    created_at: Date,
    journal_id: String
}