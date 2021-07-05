import fetch from 'node-fetch'
import { Messages } from '../types/messages'



async function getMessages(): Promise<Messages> {
    let url = "https://api-messaging.dealerpolicy.cloud/status-topic-subscriptions"
    let resp = await fetch(url)
    let data = await resp.json()
    return data as Messages
}

export default getMessages
