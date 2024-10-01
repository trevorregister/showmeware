import Entry from './Entry'

interface IJournal {
    id: String,
    x: Number,
    y: Number,
    radius: Number,
    fill: String,
    stroke: String,
    strokeWidth: Number,
    show: Boolean,
    entries: Array<Entry>
}

export class Journal implements IJournal {
    id: String
    x: Number
    y: Number
    radius: Number
    fill: String
    stroke: String
    strokeWidth: Number
    show: Boolean
    entries: Array<Entry>

    constructor({
        id,
        x,
        y,
        fill,
        show,
        entries
    }){
        this.id = id,
        this.x = x,
        this.y = y
        this.radius = 10,
        this.fill = fill,
        this.stroke = 'black',
        this.strokeWidth = 2,
        this.show = show,
        this.entries = entries
    }
}