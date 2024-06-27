import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { api_fetchMeasurements, api_addNewMeasurement } from "../api/api";

const measurementsAdapter = createEntityAdapter({
  selectId: (instance) => instance.id,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = measurementsAdapter.getInitialState({
  status: "idle",
  addStatus: "idle",
  error: null,
});

export const fetchMeasurements = createAsyncThunk(
  "measurements/fetch",
  async (_, { rejectWithValue }) => {
    console.log("In measurements slice, fetching data.");
    let measurements = [];
    try {
      let page = 1;
      let resp = null;
      let someMore = false;
      do {
        resp = await api_fetchMeasurements(page);
        console.log(`Response for page ${page}: `, JSON.stringify(resp));
        const { status, statusText, data } = resp;
        if (status === 200) {
          measurements = measurements.concat(data.results);
          page = page + 1;
          someMore = data.next !== null;
        } else {
          console.log(
            "Error fetching patient measures.",
            ` Response ${status}: ${statusText}`
          );
          return rejectWithValue(statusText);
        }
      } while (someMore);
    } catch (error) {
      console.log(`Exception fetching patient measurements: ${error}`);
      return rejectWithValue(error);
    }
    return measurements;
  }
);

export const addNewMeasurement = createAsyncThunk(
  "measurements/add",
  async (values, { rejectWithValue }) => {
    console.log(
      `In measurements slice, add new measurement: ${JSON.stringify(values)}.`
    );
    const resp = await api_addNewMeasurement(values);
    console.log(`Response ${JSON.stringify(resp)}`);
    const { status, statusText, data } = resp;
    if (status !== 201) {
      console.log(
        "Error adding new measurement.",
        ` Response ${status}: ${statusText}`
      );
      return rejectWithValue(statusText);
    }
    return data;
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
      })
      .addCase(addNewMeasurement.pending, (state, action) => {
        state.addStatus = "loading";
      })
      .addCase(addNewMeasurement.fulfilled, (state, action) => {
        state.addStatus = "succeeded";
        console.log(
          `In measurementsSlice. addNewMeasurement succeeded with action payload ${JSON.stringify(
            action.payload
          )}`
        );
        measurementsAdapter.addOne(state, action.payload);
      })
      .addCase(addNewMeasurement.rejected, (state, action) => {
        state.addStatus = "failed";
        if (action.payload) state.error = action.payload;
        else state.error = action.error.message;
      });
  },
});

export default measurementsSlice.reducer;

export const selectMeasurementsStatus = (state) => {
  return state.measurements.status;
};

export const selectMeasurementsAddStatus = (state) => {
  return state.measurements.addStatus;
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
