import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./login/Login";
import NoticeList from "./NoticeList";
import ErrorBoundary from "./error/ErrorBoundary";
import { BackdropLoading } from "./common/Loading";
import { PopupProvider } from "./popup/PopupProvider";
import ReackHookFormTest from "./Test/reactHookForm/ReactHookFormTest";
import SmsAuthAddr from "./join/SmsAuthAddr";

export default function DataGridRouter() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<BackdropLoading open={true} />}>
        <PopupProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login.view" element={<Login />} />
              <Route path="/noticeList" element={<NoticeList />} />
              <Route path="/Join/smsAuthAddr.view" element={<SmsAuthAddr />} />
              <Route
                path="/reackHookFormTest"
                element={<ReackHookFormTest />}
              />
            </Routes>
          </Router>
        </PopupProvider>
      </Suspense>
    </ErrorBoundary>
  );
}
