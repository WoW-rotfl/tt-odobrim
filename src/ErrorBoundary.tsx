// @flow
import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'

type Props = {
	children: React.ReactNode,
}

type ErrorInfo = {
	componentStack: string,
}

type State = {
	error: Error | null,
	errorInfo: ErrorInfo | null,
}

class ErrorBoundary extends React.Component<Props, State> {
	state: State = {
    error: null,
    errorInfo: null,
  }


	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		this.setState({
			error,
			errorInfo,
		})
	}

	renderError() {
		const { error, errorInfo } = this.state
		return (
			<Dialog open>
				<DialogTitle>System error</DialogTitle>
				<Card>
					<CardContent>
						<Typography variant="subtitle1" >Oops! Error ocured plesase refresh page!</Typography>
						<details style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
							{error!.toString()}
							<br />
							{errorInfo!.componentStack}
						</details>
					</CardContent>
				</Card>
			</Dialog>
		)
	}

	render() {
		const { children } = this.props
		const { error } = this.state
		if (error) {
			return this.renderError()
		}
		return children
	}
}

export default ErrorBoundary
