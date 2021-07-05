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
