import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import todosReducer from './todosSlice';
import filterReducer from './filterSlice';




const persistConfig = {
  key: "root",
  storage,
  // stateReconciler:stateReconciler
};



const persistedFilterReducer = persistReducer(persistConfig, filterReducer);



// ----------------------------------------------------------------------
const store = configureStore({
  reducer: {
    todos: todosReducer,
    filter: persistedFilterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const persistor = persistStore(store);

export default store;
