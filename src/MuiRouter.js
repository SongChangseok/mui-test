import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./login/Login";
import NoticeList from "./NoticeList";

export default function DataGridRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login.view" element={<Login />} />
        <Route path="/noticeList" element={<NoticeList />} />
      </Routes>
    </Router>
  );
}
