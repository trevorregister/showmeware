interface IJournal {
    id: String,
    x: Number,
    y: Number,
    radius: Number,
    fill: String,
    stroke: String,
    strokeWidth: Number,
    show: Boolean,
    entries: Array
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
    entries: Array

    constructor({
        id: String,
        x: Number,
        y: Number,
        fill: String,
        show: Boolean,
        entries: Array
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