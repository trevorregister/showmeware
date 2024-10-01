import Delta from 'quill-delta'
import { generateId } from '@/utils'

interface IEntry {
    id: String,
    content: Delta
}

export default class Entry implements IEntry {
    id: String;
    content: Delta

    constructor() {
        this.id = generateId()
        this.content = new Delta()
    }
}