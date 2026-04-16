import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import photoReducer from "./slices/photoSlice";
import archiveReducer from "./slices/archiveSlice";
import itineraryReducer from "./slices/itinerarySlice";
import agendaReducer from "./slices/agendaSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    photo: photoReducer,
    archive: archiveReducer,
    itinerary: itineraryReducer,
    agenda: agendaReducer,
  },
});