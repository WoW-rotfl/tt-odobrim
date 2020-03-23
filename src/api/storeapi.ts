import store from '../store'
import uniqueId from 'unique-string'
import { removeItemById } from '../utils'

export type ConditionOperator = 'gt' | 'lt'
export type Notification = {
  id: string,
  changedToSum: string;
  conditionOperator: ConditionOperator;
  completed: boolean,
  fromCurrency: string;
  fromSum: string;
  toCurrency: string;
  toSum: string;
  startTime: string;
  endTime: string;
}

export type Notifications = { [id: string]: Notification }

export type NewNotification = Omit<Notification, 'id' | 'startTime' | 'endTime' | 'completed'>

function getNotifications(): Notifications {
  const notifications = store.get('notifications')
  const parsedNotifications = notifications ? JSON.parse(notifications) : {}
  return parsedNotifications
}

function setNotifications(notifications: Notifications) {
  store.set('notifications', JSON.stringify(notifications))
}

function getTime(): string {
  const date = new Date()
  const currentDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
  const time = `${date.getHours()}:${date.getMinutes()}}`
  return `${time} ${currentDate}`
}

function addNotification(notification: Notification) {
  const notifications = getNotifications()
  setNotifications({
    ...notifications,
    [notification.id]: notification
  })
}

function createNotification(notification: NewNotification): Notification {
  const newNotification = {
    ...notification,
    id: uniqueId(),
    completed: false,
    startTime: getTime(),
    endTime: ''
  }
  addNotification(newNotification)

  return newNotification
}

function completeNotification(id: string) {
  const notifications = getNotifications()
  const notification = {
    ...notifications[id],
    completed: true,
    endTime: getTime(),
  }
  setNotifications(
    {...notifications, [id]: notification}
  )
  return notification
}

function removeNotification(id: string) {
  setNotifications(removeItemById(id, getNotifications()))
}

export default {
  createNotification,
  completeNotification,
  removeNotification
}
