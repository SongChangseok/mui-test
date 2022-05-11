import React, { Component } from "react";

function ErrorScreen() {
  return <div>test</div>;
}

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children, Fallback } = this.props;
    if (error && !Fallback) return <ErrorScreen open={true} message={error} />;
    if (error) return <Fallback error={error} />;
    return children;
  }
}
