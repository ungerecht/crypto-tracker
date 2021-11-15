import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import reducers from "./reducers";

const persistConfig = {
  key: "reducers",
  storage,
  whitelist: ["theme", "watchlist", "auth"],
};

const persistedReducer = persistReducer(persistConfig, reducers);
const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

export const store = createStore(persistedReducer, composedEnhancer);
export const persistor = persistStore(store);
