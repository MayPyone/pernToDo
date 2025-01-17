import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../feature/todoSlice'
export default configureStore({
  reducer: {
    todo: todoReducer,
  },
}) 

