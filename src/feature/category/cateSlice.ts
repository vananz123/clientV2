import { createAppSlice } from '../../app/createAppSlice';
import type { Category } from '@/pages/Admin/Product/ProductList';
import { CateAPI } from './cateAPI';
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
        updateCate: create.asyncThunk(
            async (cate)=>{
                return cate
            },
            {
                pending: (state) => {
                    state.status = 'loading';
                },
                fulfilled: (state, action) => {
                    state.status = 'idle';
                    const index = state.data.findIndex(x => x.id == action.payload.id)
                    state.data[index] = action.payload;
                },
                rejected: (state) => {
                    state.status = 'failed';
                },
            },
        ),deletaCate: create.asyncThunk(
            async (cate)=>{
                return cate
            },
            {
                pending: (state) => {
                    state.status = 'loading';
                },
                fulfilled: (state, action) => {
                    state.status = 'idle';
                    const dataNew = state.data.filter(x => x.id != action.payload.id)
                    state.data = dataNew
                },
                rejected: (state) => {
                    state.status = 'failed';
                },
            },
        )
    }),
    selectors: {
        selectCate: (cate) => cate.data,
        selectStatus: (cate) => cate.status,
    },
});
export const { addCateAsync,updateCate ,deletaCate} = cateSlice.actions;
export const { selectCate, selectStatus } = cateSlice.selectors;