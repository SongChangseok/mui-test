// import { Autocomplete, TextField } from "@mui/material";
// import React, { useState } from "react";
// import { Fetch } from "./common/Fetch";

// const renderSuccess = ({ data, onChange = (f) => f }) => {
//   const options = data.map(({ id, name }) => ({ id, label: name }));
//   return (
//     <Autocomplete
//       disablePortal
//       id="combo-box-demo"
//       options={options}
//       sx={{ wdith: 300 }}
//       renderInput={(params) => <TextField {...params} label="Pets" />}
//       onChange={onChange}
//     />
//   );
// };

// export default function ComboBox({ onChange = (f) => f }) {
//   return (
//     <Fetch
//       uri={`http://pet-library.moonhighway.com/api/pets`}
//       renderSuccess={(data) => {
//         renderSuccess(data, onChange);
//       }}
//     />
//   );
// }
