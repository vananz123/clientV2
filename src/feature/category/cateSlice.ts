import { createAppSlice } from '../../app/createAppSlice';
import { Category } from '@/type'
import { CateAPI } from './cateAPI';
import { PayloadAction } from '@reduxjs/toolkit';
export interface CateSliceState {
    data: Category[];
    status: 'idle' | 'loading' | 'failed';
}
const initialState: CateSliceState = {
    data: [],
    status: 'loading',
};
export const cateSlice = createAppSlice({
    name: 'cate',
    initialState,
    reducers: (create) => ({
        addCateAsync: create.asyncThunk(
            async (cate) => {
                const response = await CateAPI(cate);
                // The value we return becomes the `fulfilled` action payload
                return response.data;
            },
            {
                pending: (state) => {
                    state.status = 'loading';
                },
                fulfilled: (state, action) => {
                    state.status = 'idle';
                    state.data = action.payload;
                },
                rejected: (state) => {
                    state.status = 'failed';
                },
            },
        ),
        updateCate: create.reducer((state,action:PayloadAction<Category>)=>{
            state.status = 'idle';
            const index = state.data.findIndex(x => x.id ==action.payload.id)
            state.data[index] = action.payload
        })
        ,deletaCate:  create.reducer((state,action:PayloadAction<Category>)=>{
            state.status = 'idle';
            const dataNew = state.data.filter(x => x.id != action.payload.id)
            state.data = dataNew
        })
    }),
    selectors: {
        selectCate: (cate) => cate.data,
        selectStatus: (cate) => cate.status,
    },
});
export const { addCateAsync,updateCate ,deletaCate} = cateSlice.actions;
export const { selectCate, selectStatus } = cateSlice.selectors;