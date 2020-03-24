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
  completeSum: string;
  toSum: string;
  startTime: string;
  endTime: string;
}

export type Notifications = { [id: string]: Notification }

export type NewNotification = Omit<Notification, 'id' | 'startTime' | 'endTime' | 'completed' | 'completeSum'>

function getNotifications(): Notifications {
  const notifications = store.get('notifications')
  const parsedNotifications = notifications ? JSON.parse(notifications) : {}
  return parsedNotifications
}

function setNotifications(notifications: Notifications) {
  store.set('notifications', JSON.stringify(notifications))
}

function withZero(number: number) {
  return number < 10 ? `0${number}` : number;
}

function getTime(): string {
  const date = new Date()
  const currentDate = `${date.getDate()}.${withZero(date.getMonth() + 1)}.${date.getFullYear()}`
  const time = `${date.getHours()}:${withZero(date.getMinutes())}:${withZero(date.getSeconds())}`
  return `${time} ${currentDate}`
}

function addNotification(notification: Notification) {
  const notifications = getNotifications()
  setNotifications({
    [notification.id]: notification,
    ...notifications,
  })
}

function createNotification(notification: NewNotification): Notification {
  const newNotification = {
    ...notification,
    id: uniqueId(),
    completed: false,
    completeSum: '', 
    startTime: getTime(),
    endTime: ''
  }
  addNotification(newNotification)

  return newNotification
}

function completeNotification(id: string, completeSum: string) {
  const notifications = getNotifications()
  const notification = {
    ...notifications[id],
    completed: true,
    completeSum,
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
  getNotifications,
  createNotification,
  completeNotification,
  removeNotification
}
