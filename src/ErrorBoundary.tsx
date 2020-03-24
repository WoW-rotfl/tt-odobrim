import React from 'react'
import ErrorModal from './ErrorModal'

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
			<ErrorModal>
				<details style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
					{error!.toString()}
					<br />
					{errorInfo!.componentStack}
				</details>
			</ErrorModal>
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
