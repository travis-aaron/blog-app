import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

let REACT_APP_API_URL = 'http://localhost:8000'
let NODE_URL = 'http://127.0.0.1:5000'

export const register = createAsyncThunk(
    'users/register',
    async ({first_name, last_name, username, email, password}, thunkAPI) => {
        const body = JSON.stringify({
            first_name,
            last_name,
            username,
            email,
            password
        });
    
        try{
            const res = await fetch(`${REACT_APP_API_URL}/api/users/register`, {
                method: 'POST',
                headers: {
                   Accept: 'application/json',
                   'Content-Type': 'application/json', 
                },
                body,
            })

            const data = await res.json();

            if (res.status === 201) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    
    }
    );

    export const getMyUser = createAsyncThunk('users/me', async(_, thunkAPI) => {
        try {
            const res = await fetch(`/api/users/me`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                }
            })

            const data = await res.json();

            if (res.status === 200) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch(err) {
            return thunkAPI.rejectWithValue(err.response.data);

        }
    })

    export const login = createAsyncThunk(
        'users/login',
        async ({username,password}, thunkAPI) => {
            const body = JSON.stringify({
                username,
                password,
            });
        
            try{

                const res = await fetch(`/api/users/login`, {
                    method: 'POST',
                    headers: {
                       Accept: 'application/json',
                       'Content-Type': 'application/json', 
                    },
                    body,
                })
    
                const data = await res.json();
    
                if (res.status === 200) {
                    const { dispatch } = thunkAPI;

                    dispatch(getMyUser());

                    return data;
                } else {
                    return thunkAPI.rejectWithValue(data);
                }
            } catch(err){
                return thunkAPI.rejectWithValue(err.response.data);
            }
        
        }
        );

        export const checkAuth = createAsyncThunk(
            'users/verify', 
            async (_, thunkAPI) => {
                try{
                    const res = await fetch(`/api/users/verify`, {
                        method: 'GET',
                        headers: {
                           Accept: 'application/json',
                        },
                    })
        
                    const data = await res.json();
        
                    if (res.status === 200) {
                        const { dispatch } = thunkAPI;
    
                        dispatch(getMyUser());
    
                        return data;
                    } else {
                        return thunkAPI.rejectWithValue(data);
                    }
                } catch(err){
                    return thunkAPI.rejectWithValue(err.response.data);
                }
            }
        );

        export const logout = createAsyncThunk(
            'users/logout',
            async (_, thunkAPI) => {

                try{
                    const res = await fetch(`/api/users/logout`, {
                        method: 'GET',
                        headers: {
                           Accept: 'application/json',
                        },
                    })
        
                    const data = await res.json();
        
                    if (res.status === 200) {
                        return data;
                    } else {
                        return thunkAPI.rejectWithValue(data);
                    }
                } catch(err){
                    return thunkAPI.rejectWithValue(err.response.data);
                }
            
            }
            );

        export const postComment = createAsyncThunk(
            '/api/comment',
            async ({comment,post, username}, thunkAPI) => {
                const body = JSON.stringify({
                    comment,
                    post,
                    username,
                });
                try{
                    const res = await fetch(`/api/`, {
                        method: 'POST',
                        headers: {
                           Accept: 'application/json',
                           'Content-Type': 'application/json',
                        },
                        body,
                    })
        
                    const data = await res.json();
        
                    if (res.status === 200) {
    
                        
                        return data;
                    } else {
                        return thunkAPI.rejectWithValue(data);
                    }
                } catch(err){
                    return thunkAPI.rejectWithValue(err.response.data);
                }
            })

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    registered: false,
} 

 const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetRegistered: state => {
            state.registered = false;
        },

    },
    extraReducers: builder => {
        builder
        .addCase(register.pending, state =>{
            state.loading = true;    
        })
        .addCase(register.fulfilled, state  =>{
            state.registered = true;
            state.loading = false;    
        })
        .addCase(register.rejected, state =>{
            state.loading = false; 
        })
        .addCase(login.pending, state =>{
            state.loading = true; 
        })
        .addCase(login.fulfilled, state =>{
            state.loading = false;
            state.isAuthenticated = true; 
        })
        .addCase(login.rejected, state =>{
            state.loading = false; 
        })
        .addCase(getMyUser.pending, state =>{
            state.loading = true; 
        })
        .addCase(getMyUser.fulfilled, (state, action) =>{
            state.loading = false; 
            state.user = action.payload;
            state.username = action.payload.username;
        })
        .addCase(getMyUser.rejected, state =>{
            state.loading = false; 
        })
        .addCase(checkAuth.pending, state => {
            state.loading = true;
        })
        .addCase(checkAuth.fulfilled, state => {
            state.loading = false;
            state.isAuthenticated = true;
        })
        .addCase(checkAuth.rejected, state =>{
            state.loading = false;
        })
                
        .addCase(logout.pending, state =>{
            state.loading = true; 
        })
        .addCase(logout.fulfilled, state =>{
            state.loading = false; 
            state.isAuthenticated = false;
            state.user = null;
        })
        .addCase(logout.rejected, state =>{
            state.loading = false; 
        })
    }   
 });

export const { resetRegistered } = userSlice.actions
export default userSlice.reducer; 