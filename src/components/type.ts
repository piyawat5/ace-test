
export enum statusEnum {
    LAUNCHED = "LAUNCED",
    UNLAUNCH = "UN_LAUNCED",
    ALL = "ALL"
}

export interface Column {
    id: string,
    name: string,
    date: Date,
    image: string,
    crew: string[],
    status?: statusEnum,
}