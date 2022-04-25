// npm install @mui/x-data-grid...
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { Button } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First name", width: 150, editable: true },
  { field: "lastName", headerName: "Last name", width: 150, editable: true },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  //   { field: "", headerName: "", width: 0 },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const DataGridOptions = {
  rows: rows,
  columns: columns,
  pageSize: 5,
  rowsPerPageOptions: [5],
  checkboxSelection: true,
  disableSelectionOnClick: true,
};

// 테스트 데이터
//   const { data } = useDemoData({
//     dataSet: "Commodity",
//     rowLength: 5,
//     maxColumns: 6,
//   });

const Demo = () => <DataGrid {...DataGridOptions} />;

const FlexLayoutDemo = () => (
  <div style={{ display: "flex", height: "100%" }}>
    <div style={{ flexGrow: 1 }}>
      <DataGrid {...DataGridOptions} />
    </div>
  </div>
);

const AutoHeightDemo = () => {
  const [nbRows, setNbRows] = useState(5);
  const removeRow = () => setNbRows((x) => Math.max(0, x - 1)); // 첫번째 인자 보다 커야함
  const addRow = () => setNbRows((x) => Math.min(100, x + 1)); // 첫번째 인자 보다 작아야함

  return (
    <>
      <Button variant="outlined" onClick={removeRow}>
        Remove
      </Button>
      <Button variant="outlined" onClick={addRow}>
        Add
      </Button>
      <DataGrid
        autoHeight
        {...DataGridOptions}
        rows={DataGridOptions.rows.slice(0, nbRows)}
      />
    </>
  );
};

export default function DataGridTest() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      {/* <Demo /> */}
      {/* <FlexLayoutDemo /> */}
      <AutoHeightDemo />
    </div>
  );
}
