import { configureStore } from '@reduxjs/toolkit'
import { messagesApi } from '../services/messages'

const store = configureStore({
  reducer: {
    [messagesApi.reducerPath]: messagesApi.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(messagesApi.middleware),
})

export default store
