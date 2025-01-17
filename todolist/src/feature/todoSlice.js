import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const addLists = createAsyncThunk('todo/addLists', async(description)=> {
    try{
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL+'/api/addList',{description})
      return response.data;
    }catch(error){
        console.log(error)
    }
})

const fetchLists =  createAsyncThunk('todo/fetchLists', async()=>{
    try{
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL +'/api/getList')    
        return response.data;
    }catch(error){
        console.log(error)
    }
} )

const updateLists = createAsyncThunk('todo/updateLists', async({description,id})=> {
    try{

        const response = await axios.put(import.meta.env.VITE_BACKEND_URL+'/api/updateList/'+id,{description})
        return response.data
    }catch(error){
        console.log(error)
    }
})

const deleteLists = createAsyncThunk('todo/deleteLists', async(id)=> {
    try{
        const response = await axios.delete(import.meta.env.VITE_BACKEND_URL+'/api/deleteList/'+id)
        return response.data
    }catch(error){
        console.log(error)
    }
})

const isCompleted = createAsyncThunk('todo/isCompleted', async({id})=> {
    try{

        const response = await axios.put(import.meta.env.VITE_BACKEND_URL+'/api/isCompleted/'+id)
        console.log(response.data)
        return response.data
    }catch(error){
        console.log(error)
    }
})

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        loading: true,
        lists: [],
        error: '',
      },
    reducers: {
    },
    extraReducers: (builder)=> {
        builder
        .addCase(fetchLists.pending,(state)=> {
            state.loading = true;
        })
        .addCase(fetchLists.fulfilled, (state,action) => {
            state.loading = false;
            state.lists = action.payload.data;
        })
        .addCase(fetchLists.rejected, (state,action)=>{
            state.loading = false
            state.error = action.error.message
            
        })
        .addCase(addLists.pending,(state)=>{
            state.loading = true;
        })
        .addCase(addLists.fulfilled,(state, action)=> {
            state.loading = false;
            console.log(action.payload.data)

        })
        .addCase(addLists.rejected,(state)=> {
            state.loading = false;
        })
        .addCase(updateLists.pending,(state)=>{
            state.loading = true;
        })
        .addCase(updateLists.fulfilled,(state, action)=> {
            state.loading = false;
            console.log('updated list',action.payload)

        })
        .addCase(updateLists.rejected,(state)=> {
            state.loading = false;
        })
        .addCase(deleteLists.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteLists.fulfilled,(state, action)=> {
            state.loading = false;
            console.log('deleted list',action.payload)

        })
        .addCase(deleteLists.rejected,(state)=> {
            state.loading = false;
        })
        .addCase(isCompleted.pending,(state)=>{
            state.loading = true;
        })
        .addCase(isCompleted.fulfilled,(state, action)=> {
            state.loading = false;
        })
        .addCase(isCompleted.rejected,(state)=> {
            state.loading = false;
        })
    }
})

export default todoSlice.reducer;
export { fetchLists, addLists, deleteLists, updateLists, isCompleted };