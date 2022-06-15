import { createSlice } from '@reduxjs/toolkit'
import { api } from '../Features/routes';

export const productDataSlice = createSlice({
  name: 'productData',
  initialState: {
    data: [],
    dataIsLoading: true,
    numberOfProducts: 0,
    numberOfProductsIsLoading: true,
    searchResults: [],
    searchResultsIsLoading: true,
    productById: [],
    productByIdIsLoading: true,
    rating: 0,
    ratingIsLoading: true,
    discountedProducts: [],
    discountedProductsDataIsLoading: true
  },
  reducers: {
  },
  extraReducers: {


    [api.products.getProducts.pending]: (state, action) => {
      state.dataIsLoading = true;
    },
    [api.products.getProducts.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.dataIsLoading = false;
    },
    [api.products.getProducts.rejected]: (state, action) => {
      state.dataIsLoading = true;
    },

    [api.products.getProductById.pending]: (state, action) => {
      state.productByIdIsLoading = true;
    },
    [api.products.getProductById.fulfilled]: (state, action) => {
      state.productById = action.payload;
      state.productByIdIsLoading = false;
    },
    [api.products.getProductById.rejected]: (state, action) => {
      state.productByIdIsLoading = true;
    },

    [api.products.getProductPage.pending]: (state, action) => {
      state.dataIsLoading = true;
    },
    [api.products.getProductPage.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.dataIsLoading = false;
    },
    [api.products.getProductPage.rejected]: (state, action) => {
      state.dataIsLoading = true;
    },


    [api.products.getMostDiscountedProducts.pending]: (state, action) => {
      state.discountedProductsDataIsLoading = true;
    },
    [api.products.getMostDiscountedProducts.fulfilled]: (state, action) => {
      state.discountedProducts = action.payload;
      state.discountedProductsDataIsLoading = false;
    },
    [api.products.getMostDiscountedProducts.rejected]: (state, action) => {
      state.discountedProductsDataIsLoading = true;
    },


    [api.products.getNumberOfProducts.pending]: (state, action) => {
      state.numberOfProductsIsLoading = true;
    },
    [api.products.getNumberOfProducts.fulfilled]: (state, action) => {
      state.numberOfProducts = Number(action.payload.data);
      state.numberOfProductsIsLoading = false;
    },
    [api.products.getNumberOfProducts.rejected]: (state, action) => {
      state.numberOfProductsIsLoading = true;
    },


    [api.products.getSearchResults.pending]: (state, action) => {
      state.searchResultsIsLoading = true;
    },
    [api.products.getSearchResults.fulfilled]: (state, action) => {
      state.searchResults = action.payload
      state.searchResultsIsLoading = false;
    },
    [api.products.getSearchResults.rejected]: (state, action) => {
      state.searchResultsIsLoading = true;
    },


    [api.products.setRating.pending]: (state, action) => {
      state.ratingIsLoading = true;
    },
    [api.products.setRating.fulfilled]: (state, action) => {
      state.rating = action.payload.rating
      state.ratingIsLoading = false;
    },
    [api.products.setRating.rejected]: (state, action) => {
      state.ratingIsLoading = true;
    },


    [api.products.setStock.pending]: (state, action) => {
      state.dataIsLoading = true;
    },
    [api.products.setStock.fulfilled]: (state, action) => {
      if (state.data.data[action.payload.id]) { 
        state.data.data[action.payload.id].stock = action.payload.data
        state.dataIsLoading = false;
      }
    },
    [api.products.setStock.rejected]: (state, action) => {
      state.dataIsLoading = true;
    },


    [api.products.removeStock.pending]: (state, action) => {
      state.dataIsLoading = true;
    },
    [api.products.removeStock.fulfilled]: (state, action) => {
      if (state.data.data[action.payload.id]) { 
        state.data.data[action.payload.id].stock = state.data.data[action.payload.id].stock - action.payload.quantity
        state.dataIsLoading = false;
      }
    },
    [api.products.removeStock.rejected]: (state, action) => {
      state.dataIsLoading = true;
    },


    [api.products.addStock.pending]: (state, action) => {
      state.dataIsLoading = true;
    },
    [api.products.addStock.fulfilled]: (state, action) => {
      if (state.data[action.payload.id]) { 
        state.data.data[action.payload.id].stock = state.data[action.payload.id].stock + action.payload.quantity
        state.dataIsLoading = false;
      }
    },
    [api.products.addStock.rejected]: (state, action) => {
      state.dataIsLoading = true;
    },


  }
})

export default productDataSlice.reducer;