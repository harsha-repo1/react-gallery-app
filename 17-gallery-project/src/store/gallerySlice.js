import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    loading: false,
    error: null
}

const gallerySlice = createSlice({

    name: 'gallery',

    initialState,

    reducers: {

        setProducts: (state, action) => {
            state.products = action.payload
        },

        setLoading: (state, action) => {
            state.loading = action.payload
        },

        setError: (state, action) => {
            state.error = action.payload
        }

    }

})

export const {
    setProducts,
    setLoading,
    setError
} = gallerySlice.actions

export default gallerySlice.reducer