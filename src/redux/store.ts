// import { legacy_createStore as createStore, applyMiddleware } from 'redux';
// // import thunk from 'redux-thunk';
// import rootReducer from './reducers';
// // const store = createStore(rootReducer, applyMiddleware(thunk));
// const store = createStore(rootReducer, applyMiddleware());

// export default store;


// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './reducers';

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
// });

// export default store;

// redux/store.ts or redux/index.ts
import { configureStore } from '@reduxjs/toolkit';
import albumReducer from './reducers/albumReducer';

export const store = configureStore({
  reducer: {
    albumReducer,
  },
});

// ✅ Type definitions *after* store is defined
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


