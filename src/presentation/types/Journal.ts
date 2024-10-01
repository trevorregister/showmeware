import Entry from './Entry'
import { generateId } from "@/utils"

interface ICircle{
    x: Number,
    y: Number,
    radius: Number,
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
        x,
        y,
    }: {
        x: Number,
        y: Number
    }){
        this.id = generateId(),
        this.circle = {
            x,
            y,
            radius: 13,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 2,
        },
        this.entries = [new Entry()]
    }
}