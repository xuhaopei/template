export interface StoreState {
    [keyName: string]: any;
    isShowLoading: boolean;
}
export interface StoreContext {
    dispatch: (Object) => any;
    state: StoreState;
}

export interface BaseProps {
    className?: string
    style?: {
        [keyname: string]: any
    }
}
