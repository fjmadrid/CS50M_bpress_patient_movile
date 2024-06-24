import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { api_fetchMeasurements } from "../api/api";

const measurementsAdapter = createEntityAdapter({
  selectId: (instance) => instance.id,
  sortComparer: (a, b) => b.localeCompare(a),
});

const initialState = measurementsAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchMeasurements = createAsyncThunk(
  "measurements/fetch",
  async ({ rejectWithValue }) => {
    let measurements = [];
    try {
      let page = 1;
      let resp = null;
      let someMore = false;
      do {
        resp = await api_fetchMeasurements(page);
        const { Response, data, Error } = await resp.json();
        console.log(`Response for page ${page}: `, JSON.stringify(resp));
        if (Response === "True") {
          measurements = measurements.concat(data.measurements);
          page = page + 1;
          someMore = data.next !== null;
        } else {
          console.log(
            "Error fetching patient measures.",
            ` Response ${resp.status}: ${resp.error}`
          );
          return rejectWithValue(Error);
        }
      } while (someMore);
    } catch (error) {
      console.log(`Exception fetching patient measurements: ${error}`);
      return rejectWithValue(error);
    }
    return measurements;
  }
);

const measurementsSlice = createSlice({
  name: "measurements",
  initialState,
  reducers: {
    resetMeasurements(state, action) {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMeasurements.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMeasurements.fulfilled, (state, action) => {
        state.status = "succeeded";
        measurementsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchMeasurements.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) state.error = action.payload;
        else state.error = action.error.message;
      });
  },
});

export default measurementsSlice.reducer;

export const selectMeasurementsStatus = (state) => {
  return state.measurements.status;
};

export const selectMeasurementsError = (state) => {
  return state.measurements.error;
};

export const { resetMeasurements } = measurementsSlice.actions;

export const {
  selectAll: selectAllMeasurements,
  selectById: selectMeasurementById,
  selectIds: selectMeasurementsIds,
  // Pass in a selector that returns the posts slice of state
} = measurementsAdapter.getSelectors((state) => state.measurements);
