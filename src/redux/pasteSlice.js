import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes") && localStorage.getItem("pastes") !== "undefined"
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPaste: (state , action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes" , JSON.stringify(state.pastes));
      toast.success("Paste Created Succesfully !!")
    },
    updateToPaste: (state , action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => 
      item._id === paste._id);
      if(index >= 0){
        state.pastes[index] = paste;
        localStorage.setItem("pastes" , JSON.stringify(state.pastes))
        toast.success("Paste Updated !!!");
      }
    },
    removeFromPaste : (state , action)=>{
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteId);
      if(index >= 0){
        state.pastes.splice(index , 1);
        localStorage.setItem("pastes" , JSON.stringify(state.pastes));
        toast.success("Paste Deleted");
      }
    },
    resetPaste: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste, removeFromPaste , resetPaste} = pasteSlice.actions

export default pasteSlice.reducer