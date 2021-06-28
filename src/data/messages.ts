import fetch from 'node-fetch'

export interface Messages {
  overallStatus: string
  topicStatuses?: TopicStatus[] | null
}
export interface TopicStatus {
  status: string
  topicPath: string
  subscriptionCount: number
  subscriptionStatuses?: SubscriptionStatus[] | null
}
export interface SubscriptionStatus {
  status: string
  subscriptionName: string
  messageCount: number
  activeMessageCount: number
  deadLetterMessageCount: number
  scheduledMessageCount: number
}

async function getMessages(): Promise<Messages> {
    let url = "https://api-messaging.dealerpolicy.cloud/status-topic-subscriptions"
    let resp = await fetch(url)
    let data = await resp.json()
    return data as Messages
}

export default getMessages
