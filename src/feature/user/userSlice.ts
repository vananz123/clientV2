import { createAppSlice } from '../../app/createAppSlice';
import { ResponseUser } from '@/api/ResType';
import { UserAPI } from './userAPI';
export interface UserliceState {
    isAuthenticated: boolean,
    isInitialized:boolean,
    data: ResponseUser | undefined;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: UserliceState = {
    isAuthenticated:false,
    isInitialized:false,
    data: undefined,
    status: 'loading',
};
export const userSlice = createAppSlice({
    name: 'user',
    initialState,
    reducers: (create) => ({
        signIn: create.asyncThunk(
            async (user) => {
                const response = await UserAPI(user);
                // The value we return becomes the `fulfilled` action payload
                return response.data;
            },
            {
                pending: (state) => {
                    state.status = 'loading';
                },
                fulfilled: (state, action) => {
                    state.status = 'idle';
                    state.isAuthenticated =true,
                    state.isInitialized = true
                    state.data = action.payload;
                },
                rejected: (state) => {
                    state.status = 'failed';
                },
            },
        ),
        initializeActive:create.asyncThunk(
            async (user) => {
                const response = await UserAPI(user);
                // The value we return becomes the `fulfilled` action payload
                return response.data;
            },
            {
                pending: (state) => {
                    state.status = 'loading';
                },
                fulfilled: (state, action) => {
                    state.status = 'idle';
                    state.isAuthenticated =true,
                    state.isInitialized = true
                    state.data = action.payload;
                },
                rejected: (state) => {
                    state.status = 'failed';
                },
            },
        ),
        initialize:create.reducer((state)=>{
            state.data = undefined,
            state.isAuthenticated =false,
            state.isInitialized =true
        }),
        signOut:create.reducer((state)=>{
            state.data = undefined,
            state.isAuthenticated =false,
            state.isInitialized =true
        }
        )
    }),
    selectors: {
        selectUser: (user) => user.data,
        selectStatus: (user) => user.status,
        selectIsAuthenticated : (user)=> user.isAuthenticated,
        selectIsInitialized: (is)=> is.isInitialized
    },
});
export const { signIn,initialize ,initializeActive,signOut} = userSlice.actions;
export const { selectUser, selectStatus ,selectIsAuthenticated,selectIsInitialized} = userSlice.selectors;
