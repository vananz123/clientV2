import { RootState } from "@/app/store";
import { createAction, createReducer } from "@reduxjs/toolkit";
export type Mode = 'light' | 'dark'
export interface ModeSliceState {
  data:Mode;
  colorBg:string;
  color:string;
}
const initialState: ModeSliceState = {
  data: 'light',
  colorBg:'#ffffff',
  color:'#000000'
};
export const changemode = createAction('counter/increment')
const modeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changemode, (state) => {
      if(state.data  == 'light'){
        state.data = 'dark'
        state.colorBg = '#1f1f1f'
        state.color = '#ffffff'
      }else{
        state.data = 'light'
        state.colorBg = '#ffffff',
        state.color = '#000000'
      }
    })
});
export const selectMode = (state: RootState) => state.mode;

export default modeReducer;
