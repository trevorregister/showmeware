import { DbEntry } from './index'

interface ICircle {
    x: number,
    y: number,
    radius: number,
    fill: string,
    stroke: 'black',
    strokeWidth: 2,
}

export default interface DbJournal {
    id: string,
    circle: ICircle,
    entries: Array<DbEntry>,
    created_at: Date,
    user_id: string
}

