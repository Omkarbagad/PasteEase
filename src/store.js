import { configureStore } from '@reduxjs/toolkit'
import PasteReducer from './redux/pasteSlice'

export const store = configureStore({
  reducer: {
    paste: PasteReducer,
  },
})