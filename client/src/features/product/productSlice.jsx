import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//! imp API
import productAPI from '../../API/productAPI';

// export const getProducts = createAsyncThunk(
//   'product/getProducts',
//   async (data, thunkAPI) => {
//     try {
//       const response = await productAPI.getProducts(
//         data.sort,
//         data.order,
//         data.limit
//       );
//       return thunkAPI.fulfillWithValue(response);
//     } catch (error) {
//       // return custom error message from API if any
//       if (error.response && error.response.data.message) {
//         return thunkAPI.rejectWithValue(error.response.data.message);
//       } else {
//         return thunkAPI.rejectWithValue(error.message);
//       }
//     }
//   }
// );

export const fetchProductsByFilter = createAsyncThunk(
  'product/fetchProductsByFilter',
  async (arg, thunkAPI) => {
    try {
      const products = await productAPI.fetchProductsByFilter(arg);
      return thunkAPI.fulfillWithValue(products);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const getProductsByCount = createAsyncThunk(
  'product/getProductsByCount',
  //! payload ActionCreator
  async (count, thunkAPI) => {
    try {
      const response = await productAPI.getProductsByCount(count);

      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (updatedProductData, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await productAPI.createProduct(
        updatedProductData,
        config
      );

      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (productId, thunkAPI) => {
    try {
      const response = await productAPI.getProduct(productId);

      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

const initialState = {
  loading: false,
  product: {}, //! entity
  products: [], //! entities
  userProducts: [], //! entities of that is created by user
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProductsByCount.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductsByCount.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProductsByCount, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(createProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = [action.payload];
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getProduct.pending, (state, action) => {
        state.loading = true;
        state.product = initialState.product; //! {}
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // builder
    //   .addCase(getProducts.pending, (state, action) => {
    //     state.loading = true;
    //     state.products = initialState.product;
    //   })
    //   .addCase(getProducts.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.products = action.payload;
    //   })
    //   .addCase(getProducts.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   });
    builder
      .addCase(fetchProductsByFilter.pending, (state, action) => {
        state.loading = true;
        state.products = initialState.products;
      })
      .addCase(fetchProductsByFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = productSlice.actions;
const reducer = productSlice.reducer;

export default reducer;
