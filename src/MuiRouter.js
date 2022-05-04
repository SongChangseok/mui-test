import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./login/Login";
import NoticeList from "./NoticeList";
import ErrorBoundary from "./common/component/ErrorBoundary";
import { BackdropLoading } from "./common/component/Loading";
import ContextTestPage from "./Test/ContextTestPage";
import { AlertProvider } from "./error/ErrorProvider";

export default function DataGridRouter() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<BackdropLoading open={true} />}>
        <AlertProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login.view" element={<Login />} />
              <Route path="/noticeList" element={<NoticeList />} />
              <Route path="/contextTest" element={<ContextTestPage />} />
            </Routes>
          </Router>
        </AlertProvider>
      </Suspense>
    </ErrorBoundary>
  );
}
