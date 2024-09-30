  import { configureStore, combineReducers } from "@reduxjs/toolkit";
  import { persistStore, persistReducer } from "redux-persist";
  import storage from "redux-persist/lib/storage";
  import todosReducer from "./slices/todoSlice";

  const persistConfig = {
    key: "root",
    storage,
  };

  const rootReducer = combineReducers({
      tasks: todosReducer,
  })

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  export const store = configureStore({
      reducer: persistedReducer,
  });

  export const persistor = persistStore(store);

  export type RootState = ReturnType<typeof store.getState>;

  export default store;