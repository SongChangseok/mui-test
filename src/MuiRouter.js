import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NoticeList from "./NoticeList";

export default function DataGridRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/noticeList" element={<NoticeList />} />
      </Routes>
    </Router>
  );
}
