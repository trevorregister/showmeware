interface IEntry {
    id: String,
    content: {
        ops: Array
    }
}

export default class Entry implements IEntry {
    id: String
    content?: {
        ops: Array
    }

    constructor({
        id: String,
        content: { ops: Array}
    }){
        this.id = id,
        this.content ? content : { ops: [] }
    }
}