import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'

type Props = typeof defaultProps

const defaultProps = {
  title: 'System error',
  children: null as React.ReactNode,
}

const ErrorModal = ({ children, title }: Props) => (
  <Dialog open>
    <DialogTitle>{title}</DialogTitle>
    <Card>
      <CardContent>
        <Typography variant="subtitle1">
          Oops! Error ocured plesase refresh page!
        </Typography>
        {children}
      </CardContent>
    </Card>
  </Dialog>
)

ErrorModal.defaultProps = defaultProps

export default ErrorModal
