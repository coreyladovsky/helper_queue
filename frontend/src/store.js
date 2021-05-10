import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import jobsReducer from "./features/jobs/jobsSlice";
import authReducer from "./features/auth/authSlice";
import filterReducer from "./features/filter/filterSlice";
import searchReducer from "./features/search/searchSlice";
import modalReducer from "./features/modal/modalSlice";
import paginationReducer from "./features/pagination/paginationSlice";
import ticketsReducer from "./features/tickets/ticketsSlice";
import requestsReducer from "./features/requests/requestsSlice";
import pairsReducer from "./features/pairs/pairsSlice";
import logger from 'redux-logger'

const middleware =
  process.env.NODE_ENV === "development"
    ? [logger, ...getDefaultMiddleware()]
    : [...getDefaultMiddleware()];

export default configureStore({
  reducer: {
    jobs: jobsReducer,
    auth: authReducer,
    filter: filterReducer,
    search: searchReducer,
    modal: modalReducer,
    pagination: paginationReducer,
    tickets: ticketsReducer,
    request: requestsReducer,
    pairs: pairsReducer
  },
  middleware,
  devTools: true,
});
