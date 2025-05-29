// import {configureStore} from '@reduxjs/toolkit'?
import { configureStore } from '@reduxjs/toolkit';

import {setupListeners} from '@reduxjs/toolkit/query'
import {MyMainReducer} from './Reducer'
import {jsondataApi} from './jsondata'
import {MyBillReducer} from './Reducer'
export const store=configureStore({
    reducer:{
[jsondataApi.reducerPath]: jsondataApi.reducer,
        app:MyMainReducer,
        bill:MyBillReducer
    },
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(jsondataApi.middleware)
})
setupListeners(store.dispatch);