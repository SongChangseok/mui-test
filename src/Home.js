import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <nav>
        <Link to="/noticeList">공지사항</Link>
      </nav>
    </div>
  );
}
