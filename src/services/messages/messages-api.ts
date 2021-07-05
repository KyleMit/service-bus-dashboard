import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Messages } from '../../types/messages'

// Define a service using a base URL and expected endpoints
export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api-messaging.dealerpolicy.cloud/status-topic-subscriptions' }),
  endpoints: (builder) => ({
    getAll: builder.query<Messages, string>({
      query: () => ""
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllQuery } = messagesApi
