import { DbEntry } from './index'

interface ICircle {
    x: Number,
    y: Number,
    radius: Number,
    fill: String,
    stroke: 'black',
    strokeWidth: 2,
}

export default interface DbJournal {
    id: String,
    circle: ICircle,
    entries: Array<DbEntry>,
    created_at: Date,
    user_id: String
}

