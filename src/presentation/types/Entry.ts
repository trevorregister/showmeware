import Delta from 'quill-delta'

interface IEntry {
    id: String,
    content: Array<Delta>
}

export default class Entry implements IEntry {
    id: String;
    content: Array<Delta>

    constructor({
        id,
        content
    }: {
        id: String,
        content: Array<Delta>
    }) {
        this.id = id;
        this.content = content
    }
}