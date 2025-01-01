import Delta from 'quill-delta'
import { generateId } from '@/utils'

interface IEntry {
    id: string,
    content: Delta,
    event: object
}

export default class Entry implements IEntry {
    id: string
    content: Delta
    event: object

    constructor() {
        this.id = generateId()
        this.content = new Delta()
        this.event = {}
    }
}
