import { CartResult } from '@/api/ResType';
import { createAppSlice } from '../../app/createAppSlice';
import { CartAPI } from './cartAPI';

export interface CartliceState {
    data: CartResult;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: CartliceState = {
    data: {
        totalPrice:0,
        totalDiscount:0,
        totalPriceBeforeDiscount:0,
        items:[]
    },
    status: 'loading',
};
export const cartSlice = createAppSlice({
    name: 'cart',
    initialState,
    reducers: (create) => ({
        addToCart: create.asyncThunk(
            async (cart) => {
                const response = await CartAPI(cart);
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
        emptyCart: create.reducer((state)=>{
            let dataE: CartResult = {
                totalPrice:0,
                totalPriceBeforeDiscount:0,
                totalDiscount:0,
                items:[]
            }
            state.data = dataE
            state.status ='loading'
        })
        
    }),
    selectors: {
        selectCart: (state) => state.data,
        selectStatus: (state) => state.status,
    },
});
export const {addToCart,emptyCart} = cartSlice.actions;
export const { selectCart, selectStatus } = cartSlice.selectors;