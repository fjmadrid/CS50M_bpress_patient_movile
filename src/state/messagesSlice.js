import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { api_fetchMessages } from "../api/api";

const messagesAdapter = createEntityAdapter({
  selectId: (instance) => instance.id,
  sortComparer: (a, b) => a.date.localeCompare(b.date),
});

const initialState = messagesAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchMessages = createAsyncThunk(
  "messages/fetch",
  async (_, { rejectWithValue }) => {
    console.log("In messages slice, fetching data.");
    try {
      const resp = await api_fetchMessages();
      console.log("In messages slice, response:", JSON.stringify(resp));
      const { status, statusText, data } = resp;
      if (status === 200) {
        return data;
      } else {
        console.log(
          "In messages slice, error fetching messages.",
          ` Response ${status}: ${statusText}`
        );
        return rejectWithValue(statusText);
      }
    } catch (error) {
      console.log(
        `In messages slice, caught exception fetching patient messages: ${error}`
      );
      return rejectWithValue(error?.message ? error.message : "network error.");
    }
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    resetMessages(state, action) {
      return initialState;
    },
    addNewMessage(state, action) {
      messagesAdapter.addOne(state, action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMessages.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        messagesAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) state.error = action.payload;
        else state.error = action.error.message;
      });
  },
});

export default messagesSlice.reducer;

export const selectMessagesStatus = (state) => {
  return state.messages.status;
};

export const selectMessagesAddStatus = (state) => {
  return state.messages.addStatus;
};

export const selectMessagesError = (state) => {
  return state.messages.error;
};

export const { resetMessages, resetAddStatus, addNewMessage, editMessage } =
  messagesSlice.actions;

export const {
  selectAll: selectAllMessages,
  selectById: selectMessageById,
  selectIds: selectMessagesIds,
  // Pass in a selector that returns the posts slice of state
} = messagesAdapter.getSelectors((state) => state.messages);
