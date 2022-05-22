import { createSlice } from '@reduxjs/toolkit'
import { api } from '../Features/routes';

export const cartDataSlice = createSlice({
  name: 'cartData',
  initialState: {
    cartProductsData: [],
    dataIsLoading: true,
    numberOfCartItems: 0,
    numberOfCartItemsIsLoading: true,
    totalPrice: 0,
    totalPriceIsLoading: true,
    addToCartToastDisplayed: false,
    addToCartToastDisplayedIsLoading: true
  },
  reducers: {
  },
  extraReducers: {


    [api.cart.setAddToCartToastDisplayed.pending]: (state, action) => {
      state.addToCartToastDisplayedIsLoading = true;
    },
    [api.cart.setAddToCartToastDisplayed.fulfilled]: (state, action) => {
      state.addToCartToastDisplayed = action.payload;
      state.addToCartToastDisplayedIsLoading = false;
    },
    [api.cart.setAddToCartToastDisplayed.rejected]: (state, action) => {
      state.addToCartToastDisplayedIsLoading = true;
    },


    [api.cart.getCartProductsByEmail.pending]: (state, action) => {
      state.cartProductsDataIsLoading = true;
    },
    [api.cart.getCartProductsByEmail.fulfilled]: (state, action) => {
      state.cartProductsData = action.payload;
      state.cartProductsDataIsLoading = false;
    },
    [api.cart.getCartProductsByEmail.rejected]: (state, action) => {
      state.cartProductsDataIsLoading = true;
    },


    // [api.cart.deleteFromCart.pending]: (state, action) => {
    //   state.cartProductsDataIsLoading = true;
    // },
    // [api.cart.deleteFromCart.fulfilled]: (state, action) => {
    //   state.cartProductsData = state.cartProductsData.splice(action.payload.index, 1)
    //   state.cartProductsDataIsLoading = false;
    // },
    // [api.cart.deleteFromCart.rejected]: (state, action) => {
    //   state.cartProductsDataIsLoading = true;
    // },



    [api.cart.addProductToCart.pending]: (state, action) => {
      state.cartProductsDataIsLoading = true;
    },
    [api.cart.addProductToCart.fulfilled]: (state, action) => {

      return {
        cartProductsData: [
          ...state.cartProductsData,
          action.payload
        ]
      }
    },
    [api.cart.addProductToCart.rejected]: (state, action) => {
      state.cartProductsDataIsLoading = true;
    },


    [api.cart.getNumberOfCartItems.pending]: (state, action) => {
      state.numberOfCartItemsIsLoading = true;
    },
    [api.cart.getNumberOfCartItems.fulfilled]: (state, action) => {
      state.numberOfCartItems = action.payload;
      state.numberOfCartItemsIsLoading = false;
    },
    [api.cart.getNumberOfCartItems.rejected]: (state, action) => {
      state.numberOfCartItemsIsLoading = true;
    },


    [api.cart.setNumberOfCartItems.pending]: (state, action) => {
      state.numberOfCartItemsIsLoading = true;
    },
    [api.cart.setNumberOfCartItems.fulfilled]: (state, action) => {
      state.numberOfCartItems = action.payload;
      state.numberOfCartItemsIsLoading = false;
    },
    [api.cart.setNumberOfCartItems.rejected]: (state, action) => {
      state.numberOfCartItemsIsLoading = true;
    },


    [api.cart.addToNumberOfCartItems.pending]: (state, action) => {
      state.numberOfCartItemsIsLoading = true;
    },
    [api.cart.addToNumberOfCartItems.fulfilled]: (state, action) => {
      state.numberOfCartItems = state.numberOfCartItems + action.payload;
      state.numberOfCartItemsIsLoading = false;
    },
    [api.cart.addToNumberOfCartItems.rejected]: (state, action) => {
      state.numberOfCartItemsIsLoading = true;
    },


    [api.cart.setTotalPrice.pending]: (state, action) => {
      state.totalPriceIsLoading = true;
    },
    [api.cart.setTotalPrice.fulfilled]: (state, action) => {
      state.totalPrice = action.payload;
      state.totalPriceIsLoading = false;
    },
    [api.cart.setTotalPrice.rejected]: (state, action) => {
      state.totalPriceIsLoading = true;
    },


    [api.cart.getTotalPrice.pending]: (state, action) => {
      state.totalPriceIsLoading = true;
    },
    [api.cart.getTotalPrice.fulfilled]: (state, action) => {
      state.totalPrice = action.payload;
      state.totalPriceIsLoading = false;
    },
    [api.cart.getTotalPrice.rejected]: (state, action) => {
      state.totalPriceIsLoading = true;
    },



    [api.cart.removeQuantity.pending]: (state, action) => {
      state.cartProductsDataIsLoading = true;
    },
    [api.cart.removeQuantity.fulfilled]: (state, action) => {
      if (state.cartProductsData[action.payload.index]) { 
        state.cartProductsData[action.payload.index].quantity = state.cartProductsData[action.payload.index].quantity - action.payload.quantity
        state.cartProductsDataIsLoading = false;
      }
    },
    [api.cart.removeQuantity.rejected]: (state, action) => {
      state.cartProductsDataIsLoading = true;
    },


    [api.cart.addQuantity.pending]: (state, action) => {
      state.cartProductsDataIsLoading = true;
    },
    [api.cart.addQuantity.fulfilled]: (state, action) => {
      if (state.cartProductsData[action.payload.id]) { 
        state.cartProductsData[action.payload.id].quantity = state.cartProductsData[action.payload.id].quantity + action.payload
        state.cartProductsDataIsLoading = false;
      }
    },
    [api.cart.addQuantity.rejected]: (state, action) => {
      state.cartProductsDataIsLoading = true;
    },


  }
})

export default cartDataSlice.reducer;