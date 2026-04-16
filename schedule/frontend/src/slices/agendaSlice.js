import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import agendaService from "../services/agendaService";

const initialState = {
    agendas: [],
    agenda: {},
    error: false,
    success: false,
    loading: false,
    message: null,
};

// Publish an user's agenda
export const publishAgenda = createAsyncThunk(
  "agenda/publish",
  async (agenda, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    console.log(token);
    const data = await agendaService.publishAgenda(agenda, token);
    
    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Get user agendas
export const getUserAgendas = createAsyncThunk(
  "agenda/useragendas",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await agendaService.getUserAgendas(id, token);

    return data;
  }
);

// Get agenda
export const getAgenda = createAsyncThunk("agenda/getagenda", async (id) => {
  const data = await agendaService.getAgenda(id);

  return data;
});

// Delete an agenda
export const deleteAgenda = createAsyncThunk(
  "agenda/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await agendaService.deleteAgenda(id, token);
    
    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Update an agenda
export const updateAgenda = createAsyncThunk(
  "agenda/update",
  async (agendaData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await agendaService.updateAgenda (
      { date: agendaData.date,
        description: agendaData.description},
      agendaData.id,
      token
    );

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Get all agendas
export const getAgendas = createAsyncThunk("agenda/getall", async () => {
  const data = await agendaService.getAgendas();

  return data;
});

// Search agendas by userAuth
export const searchAgendas = createAsyncThunk(
  "agenda/search",
  async (query, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await agendaService.searchAgendas(query._id, token);

    return data;
  }
);

export const agendaSlice = createSlice({
  name: "publish",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishAgenda.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishAgenda.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.agenda = action.payload;
        state.agendas.unshift(state.agenda);
        state.message = "Agenda publicada com sucesso!";
      })
      .addCase(publishAgenda.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.agenda = null;
      })
      .addCase(getUserAgendas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAgendas.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.agendas = action.payload;
      })
      .addCase(getAgenda.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAgenda.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.agenda = action.payload;
      })
      .addCase(deleteAgenda.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAgenda.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.agendas = state.agendas.filter((agenda) => {
          return agenda._id !== action.payload.id;
        });

        state.message = action.payload.message;
      })
      .addCase(deleteAgenda.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.agenda = null;
      })
      .addCase(updateAgenda.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAgenda.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.agendas.map((agenda) => {
          if (agenda._id === action.payload.agenda._id) {
            return (agenda.date = action.payload.agenda.date);
          }
          return agenda;
        });

        state.message = action.payload.message;
      })
      .addCase(updateAgenda.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.agenda = null;
      })
      .addCase(getAgendas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAgendas.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.agendas = action.payload;
      })
      .addCase(searchAgendas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAgendas.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.agendas = action.payload;
      });
  },
});

export const { resetMessage } = agendaSlice.actions;
export default agendaSlice.reducer;
