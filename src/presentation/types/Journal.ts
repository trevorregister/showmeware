import Entry from './Entry'
import { generateId } from "@/utils"

interface ICircle{
    x: Number,
    y: Number,
    radius: 13,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 2,
}

interface IJournal {
    id: String,
    circle: ICircle,
    entries: Array<Entry>
}


export default class Journal implements IJournal {
    id: String
    circle: ICircle
    entries: Array<Entry>

    constructor({
        circle,
        entries
    }){
        this.id = generateId(),
        this.circle = circle,
        this.entries = entries
    }
}