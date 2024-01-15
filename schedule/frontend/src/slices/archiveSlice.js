import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import archiveService from "../services/archiveService";

const initialState = {
    archives: [],
    archive: {},
    error: false,
    success: false,
    loading: false,
    message: null,
};

// Publish an user's archive
export const publishArchive = createAsyncThunk(
  "archive/publish",
  async (archive, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await archiveService.publishArchive(archive, token);
    console.log(data);
    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Get user archives
export const getUserArchives = createAsyncThunk(
  "archive/userarchives",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await archiveService.getUserArchives(id, token);

    return data;
  }
);

// Get archive
export const getArchive = createAsyncThunk("archive/getarchive", async (id) => {
  const data = await archiveService.getArchive(id);

  return data;
});

// Delete an archive
export const deleteArchive = createAsyncThunk(
  "archive/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await archiveService.deleteArchive(id, token);
    
    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Update an archive
export const updateArchive = createAsyncThunk(
  "archive/update",
  async (archiveData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await archiveService.updateArchive(
      { title: archiveData.title },
      archiveData.id,
      token
    );

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Get all archives
export const getArchives = createAsyncThunk("archive/getall", async () => {
  const data = await archiveService.getArchives();

  return data;
});

// Search archives by title
export const searchArchives = createAsyncThunk(
  "archive/search",
  async (query, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await archiveService.searchArchives(query, token);

    return data;
  }
);

export const archiveSlice = createSlice({
  name: "publish",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishArchive.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishArchive.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.archive = action.payload;
        state.archives.unshift(state.archive);
        state.message = "Arquivo publicado com sucesso!";
      })
      .addCase(publishArchive.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.archive = null;
      })
      .addCase(getUserArchives.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserArchives.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.archives = action.payload;
      })
      .addCase(getArchive.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getArchive.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.archive = action.payload;
      })
      .addCase(deleteArchive.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteArchive.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.archives = state.archives.filter((archive) => {
          return archive._id !== action.payload.id;
        });

        state.message = action.payload.message;
      })
      .addCase(deleteArchive.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.archive = null;
      })
      .addCase(updateArchive.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateArchive.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.archives.map((archive) => {
          if (archive._id === action.payload.archive._id) {
            return (archive.title = action.payload.archive.title);
          }
          return archive;
        });

        state.message = action.payload.message;
      })
      .addCase(updateArchive.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.archive = null;
      })
      .addCase(getArchives.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getArchives.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.archives = action.payload;
      })
      .addCase(searchArchives.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchArchives.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.archives = action.payload;
      });
  },
});

export const { resetMessage } = archiveSlice.actions;
export default archiveSlice.reducer;
