import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div>
      <nav>
        <Link to="/login.view">로그인</Link>
        <Link to="/noticeList">공지사항</Link>
        <Link to="/contextTest">Context Test</Link>
        <Link to="/reackHookFormTest">ReackHookForm Test</Link>
      </nav>
    </div>
  );
}
