import * as MessagesApi from './messages-api'
import * as MessagesMock from './messages-mock'

const messages = Boolean(process.env.REACT_APP_USE_MOCK_DATA) ? MessagesMock : MessagesApi;

export const messagesApi = messages.messagesApi as typeof MessagesApi.messagesApi;
export const useGetAllQuery = messages.useGetAllQuery as typeof MessagesApi.useGetAllQuery;
