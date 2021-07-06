import { Messages } from '../../types/messages';
import data from './sample-data.json';

export const useGetAllQuery = (str: string) => ({
  data: data as Messages,
  error: false,
  isLoading: false,
  refetch: () => data as Messages
})

export const messagesApi = {
  reducerPath: "messagesApi",
  reducer: () => useGetAllQuery,
  middleware: (store: any) => (next: any) => (action: any) => next(action)
}
