import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Fetch } from "./common/Fetch";

const GridDemo = ({ data }) => {
  const columns = [
    { field: "seq", headerName: "NO", width: 50 },
    { field: "noti_subj", headerName: "제목", flex: 1 },
  ];
  const rows = data.data.map((v, i) => ({
    id: i,
    ...v,
  }));
  const sx = {
    fontSize: 10,
  };

  const dataGridOptions = {
    columns,
    rows,
    sx,
    headerHeight: 40,
    rowHeight: 30,
    pageSize: 10,
    rowsPerPageOptions: [10],
    // autoHeight: true,
  };

  return (
    <div style={{ height: 300, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1, fontSize: 12 }}>
          <DataGrid {...dataGridOptions} />
        </div>
      </div>
    </div>
  );
};

export default function DataGridTest2() {
  return (
    <Fetch uri={`/dstk/Notice/getNoticeList.do`} renderSuccess={GridDemo} />
  );
}
