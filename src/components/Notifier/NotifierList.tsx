import React from 'react'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'

import NotifierListItem from './NotifierListItem'
import { Notification } from '../../api/storeapi'

type Props = {
  notifications: Notification[]
}

const NotifierList= ({
  notifications
}: Props) => (
  <>
    <Typography variant="subtitle2">Notifications:</Typography>
    <List>
      {notifications.map(notification => (
        <NotifierListItem key={notification.id} {...notification} />
      ))}
    </List>
  </>
)

export default NotifierList