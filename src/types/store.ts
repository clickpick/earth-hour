export enum ActionTypes {

}

export type Error = string | null;

export interface Action {
    type: ActionTypes,
    [index: string]: any
}