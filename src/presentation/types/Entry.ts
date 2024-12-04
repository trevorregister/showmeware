import Delta from 'quill-delta'
import { generateId } from '@/utils'

interface IEntry {
    id: string,
    content: Delta
}

export default class Entry implements IEntry {
    id: string;
    content: Delta

    constructor() {
        this.id = generateId()
        this.content = new Delta()
    }
}