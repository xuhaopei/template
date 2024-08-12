import { createSlice, configureStore } from '@reduxjs/toolkit'


// 初始化store树中stateModule的初始数据state与修改state的方法reducers
export const initStateModule = createSlice({
    name: 'state',
    initialState: {
        loading: false,
        useInfo: {
            username: 'snyc'
        },
    },
    reducers: {
        syncActionSetUseInfo(state, action) {
            state.useInfo = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
    },
})

// 导出同步方法，方便react组件使用
export const {
    syncActionSetUseInfo,
    setLoading,
} = initStateModule.actions

// 导出异步方法
export const asyncActionSetUserInfo = (params = {}): any => {
    return async (dispatch, getState) => {
        dispatch(setLoading(true))
        console.log('params', params)
        try {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(1)
                }, 3000)
            })
            dispatch(syncActionSetUseInfo(params))
        } catch (error) {
            console.error(error)
        }
        dispatch(setLoading(false))
    }
}
// 导出store
export default configureStore({
    reducer: {
        state: initStateModule.reducer
    }
})
