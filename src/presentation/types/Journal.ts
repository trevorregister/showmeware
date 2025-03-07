import Entry from './Entry'
import { generateId } from "@/utils"

interface ICircle{
    x: number,
    y: number,
    radius: number,
    fill: string,
    stroke: 'black',
    strokeWidth: 2,
}

interface IJournal {
    id: string,
    circle: ICircle,
    entries: Array<Entry>
}


export default class Journal implements IJournal {
    id: string
    circle: ICircle
    entries: Array<Entry>

    constructor({
        x,
        y,
    }: {
        x: number,
        y: number
    }){
        this.id = generateId(),
        this.circle = {
            x,
            y,
            radius: 13,
            fill: '#008000',
            stroke: 'black',
            strokeWidth: 2,
        },
        this.entries = [new Entry()]
    }
}