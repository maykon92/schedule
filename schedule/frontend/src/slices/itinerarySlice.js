import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import itineraryService from "../services/itineraryService";

const initialState = {
    itinerarys: [],
    itinerary: {},
    error: false,
    success: false,
    loading: false,
    message: null,
};

// Publish an user's itinerary
export const publishItinerary = createAsyncThunk(
  "itinerary/publish",
  async (itinerary, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await itineraryService.publishItinerary(itinerary, token);
    
    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Get user itinerarys
export const getUserItinerarys = createAsyncThunk(
  "itinerary/useritinerarys",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await itineraryService.getUserItinerarys(id, token);

    return data;
  }
);

// Get itinerary
export const getItinerary = createAsyncThunk("itinerary/getitinerary", async (id) => {
  const data = await itineraryService.getItinerary(id);

  return data;
});

// Delete an itinerary
export const deleteItinerary = createAsyncThunk(
  "itinerary/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await itineraryService.deleteItinerary(id, token);
    
    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Update an itinerary
export const updateItinerary = createAsyncThunk(
  "itinerary/update",
  async (itineraryData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await itineraryService.updateItinerary(
      { title: itineraryData.title,
        description: itineraryData.description},
      itineraryData.id,
      token
    );

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Get all itinerarys
export const getItinerarys = createAsyncThunk("itinerary/getall", async () => {
  const data = await itineraryService.getItinerarys();

  return data;
});

// Search itinerarys by userAuth
export const searchItinerarys = createAsyncThunk(
  "itinerary/search",
  async (query, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await itineraryService.searchItinerarys(query._id, token);

    return data;
  }
);

export const itinerarySlice = createSlice({
  name: "publish",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishItinerary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishItinerary.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.itinerary = action.payload;
        state.itinerarys.unshift(state.itinerary);
        state.message = "Itinerário publicado com sucesso!";
      })
      .addCase(publishItinerary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.itinerary = null;
      })
      .addCase(getUserItinerarys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserItinerarys.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.itinerarys = action.payload;
      })
      .addCase(getItinerary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getItinerary.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.itinerary = action.payload;
      })
      .addCase(deleteItinerary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteItinerary.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.itinerarys = state.itinerarys.filter((itinerary) => {
          return itinerary._id !== action.payload.id;
        });

        state.message = action.payload.message;
      })
      .addCase(deleteItinerary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.itinerary = null;
      })
      .addCase(updateItinerary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItinerary.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.itinerarys.map((itinerary) => {
          if (itinerary._id === action.payload.itinerary._id) {
            return (itinerary.title = action.payload.itinerary.title);
          }
          return itinerary;
        });

        state.message = action.payload.message;
      })
      .addCase(updateItinerary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.itinerary = null;
      })
      .addCase(getItinerarys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getItinerarys.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.itinerarys = action.payload;
      })
      .addCase(searchItinerarys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchItinerarys.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.itinerarys = action.payload;
      });
  },
});

export const { resetMessage } = itinerarySlice.actions;
export default itinerarySlice.reducer;
