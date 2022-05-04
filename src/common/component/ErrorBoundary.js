import React, { Component } from "react";
// import Alert from "./Alert";

// function ErrorScreen({ open, message }) {
//   return <Alert open={open} title="알림" message={message} />;

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
