import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    data:[{name:"name",email:"email"}]
}

export const fromSlice = createSlice({
    name:"from",
    initialState,
    reducers:{
        
    }
})