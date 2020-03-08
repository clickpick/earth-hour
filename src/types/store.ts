export enum ActionTypes {

}

export interface Action {
    type: ActionTypes,
    [index: string]: any
}