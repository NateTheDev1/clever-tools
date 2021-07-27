import { applyMiddleware, createStore } from "redux";
import Thunk from "redux-thunk";
import logger from "redux-logger";
import { RootState } from "./types/state-types";
import { allReducers } from "./reducer.index";

export const store = createStore<RootState, any, any, any>(
  allReducers,
  applyMiddleware(Thunk, logger)
);
