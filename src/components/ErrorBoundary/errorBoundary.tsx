import { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import styles from './errorBoundary.module.scss';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      const handleClick = () => {
        this.setState({ hasError: false });
        location.reload();
      };

      return (
        <div className={styles.Error}>
          <h2 className={styles.ErrorTitle}>Oops, there is a server error!</h2>
          <h3>
            The first server response can take 10-50 seconds, which is why you see this message!
          </h3>
          <Link to="/" className={styles.ErrorButton} type="button" onClick={handleClick}>
            Try again?
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
