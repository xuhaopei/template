import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
import Apis from '@/pages/pc/apis/user'
export const Context = React.createContext(null)
export const initialState = {
    userInfo: {},
    imInfo: {
        newMsg: null
    },
    isShowLogin: false,
    isShowLoading: false,
    askLoginSuccess: 0,
    isAtGamePage: false, // 用来判断当前是否在游戏界面
}

export const reduxSlice = createSlice({
    name: 'h5',
    initialState,
    reducers: {
        setImMsg: (state, { payload }) => {
            state.imInfo.newMsg = payload
        },
        setUserInfo: (state, { payload }) => {
            state.userInfo = payload
        },
        setIsShowLogin: (state, { payload }) => {
            state.isShowLogin = payload
        },
        setIsShowLoading: (state, { payload }) => {
            state.isShowLoading = payload
        },
        setAskLoginSuccess: (state, { payload }) => {
            state.askLoginSuccess = payload
        },
        setIsAtGamePage: (state, { payload }) => {
            state.isAtGamePage = payload
        },
    }
})

// Action creators are generated for each case reducer function
export const {
    setImMsg,
    setUserInfo,
    setIsShowLogin,
    setIsShowLoading,
    setAskLoginSuccess,
    setIsAtGamePage
} = reduxSlice.actions

// account login
export const accountLogin = (params: any) => async (dispatch, getState) => {
    const res = await Apis.account_login(params)
    const loginInfo = res?.data
    if (!loginInfo) return
    localStorage.setItem('loginInfo', JSON.stringify(loginInfo))
    dispatch(setUserInfo(loginInfo.user_info))
    dispatch(setAskLoginSuccess(new Date().getTime()))
    return res
}
export const accountLoginByThird = (params: any) => async (dispatch, getState) => {
    const res = await Apis.third_party_login(params)
    const loginInfo = res?.data
    if (!loginInfo) return
    localStorage.setItem('loginInfo', JSON.stringify(loginInfo))
    dispatch(setUserInfo(loginInfo.user_info))
    dispatch(setAskLoginSuccess(new Date().getTime()))
    return res
}
// Reducer
export default reduxSlice.reducer
